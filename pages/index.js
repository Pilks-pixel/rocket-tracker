import Head from "next/head";
import { Inter, Mooli, Roboto, Titillium_Web } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

// component imports
import CardList from "../components/CardList";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });
const titillium = Titillium_Web({ subsets: ["latin"], weight: "600" });

export default function Home() {
	const [apiData, setApiData] = useState([]);
	const [dataQuery, setDataQuery] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const [searchedData, setSearchedData] = useState([]);

	// API fetch logic
	useEffect(() => {
		const queryOptions = {
			select: "id name date_utc success upcoming details failures links",
			sort: "date_utc",
			limit: 150,
		};

		const getlaunchData = async () => {
			try {
				const url = "https://api.spacexdata.com/v5/launches/query";
				const response = await axios.post(url, {
					options: queryOptions,
				});

				setApiData(response.data.docs);
			} catch (error) {
				console.error(error);
			}
		};

		getlaunchData();
	}, []);

	// Filter API Data Logic
	useEffect(() => {
		const filterResults = dataQuery => {
			return apiData.filter(launchItem => {
				return launchItem[dataQuery];
			});
		};

		const filterByFailure = apiData.filter(launchItem => {
			return !launchItem.success;
		});

		dataQuery === "success"
			? setFilteredData(filterResults(dataQuery))
			: dataQuery === "upcoming"
			? setFilteredData(filterResults(dataQuery))
			: dataQuery === "failure"
			? setFilteredData(filterByFailure)
			: setFilteredData(apiData);
	}, [dataQuery, apiData]);

	// Search Filtered OR Unfiltered Logic
	useEffect(() => {
		const searchData = filteredData.filter(launchItem => {
			return launchItem.name.toLowerCase().includes(searchQuery.toLowerCase());
		});

		searchQuery.length > 0
			? setSearchedData(searchData)
			: setSearchedData(filteredData);
	}, [searchQuery, filteredData]);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='space x monitor' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<header className={`${styles.header} ${titillium.className} `}>
				<h1 className={styles.header__title}>Space X Launch Tracker</h1>
			</header>
			<main className={`${styles.main} ${roboto.className}`}>
				<nav className={styles.nav}>
					<input
						className={styles.nav__search}
						type='text'
						aria-label='Search by launch..'
						placeholder='Search by launch..'
						value={searchQuery}
						onChange={e => {
							setSearchQuery(e.target.value);
						}}
					/>
					<div>
						<label htmlFor='filter-data'>Filter by</label>
						<select
							className={styles.nav__select}
							id='filter-data'
							onChange={e => {
								setDataQuery(e.target.value);
							}}
						>
							<option value='all'>All</option>
							<option value='success'>Launch Success</option>
							<option value='failure'>Launch Failure</option>
							<option value='upcoming'>Future Launches</option>
						</select>
					</div>
				</nav>
				<CardList launchInfo={searchedData} />
			</main>
		</>
	);
}
