import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

// component imports
import CardList from "../components/CardList";

const inter = Inter({ subsets: ["latin"] });

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
			limit: 100,
		};

		const getlaunchData = async () => {
			try {
				const url = "https://api.spacexdata.com/v5/launches/query";
				const response = await axios.post(url, {
					options: queryOptions,
				});
    console.log(response);

				setApiData(response.data.docs);
			} catch (error) {
				console.error(error);
			}
		};

		getlaunchData();
	}, []);

	// Filter API Data Logic
	useEffect(() => {
		const filterBySuccess = apiData.filter(launchItem => {
			return launchItem.success;
		});

		const filterByFailure = apiData.filter(launchItem => {
			return !launchItem.success;
		});

		const filterByUpcoming = apiData.filter(launchItem => {
			return launchItem.upcoming;
		});

		dataQuery === "success"
			? setFilteredData(filterBySuccess)
			: dataQuery === "upcoming"
			? setFilteredData(filterByUpcoming)
			: dataQuery === "failed"
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
			<header className={styles.header}>
				<h1 className={styles.header__title}>Space X Launch Monitor</h1>
			</header>
			<main className={`${styles.main} ${inter.className}`}>
				<nav>
					<input
						type='text'
						placeholder='Search by launch..'
						value={searchQuery}
						onChange={e => {
							setSearchQuery(e.target.value);
						}}
					/>

					<select
						id='filters'
						onChange={e => {
							console.log(e.target.value);
							setDataQuery(e.target.value);
						}}
					>
						<option value='all'>All</option>
						<option value='success'>Launch Success</option>
						<option value='failed'>Launch Failure</option>
						<option value='upcoming'>Future Launches</option>
					</select>
				</nav>
				<CardList launchInfo={searchedData} />

				<footer>Made by Pete</footer>
			</main>
		</>
	);
}
