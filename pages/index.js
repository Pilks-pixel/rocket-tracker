import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

// component imports
import CardList from "../components/CardList"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [launchData, setLaunchData] = useState([])

  // API fetch logic
  useEffect(() => {
    const queryOptions = {
			select: "id name date_utc success upcoming details failures links",
			sort: "date_utc", // Sort by date_utc field
			limit: 100, // Limit the number of results
		};

		async function getlaunchData() {
			try {
				const url = "https://api.spacexdata.com/v5/launches/query";
				const response = await axios.post(url, {
          options: queryOptions
        });
				// console.log(response.data.docs);
        setLaunchData(response.data.docs);
				
			} catch (error) {
				console.error(error);
			}
		}

    getlaunchData()
	}, []);

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
				<section className={styles.main__container}>
					<CardList launchInfo={launchData} />
				</section>

				<footer>Made by Pete</footer>
			</main>
		</>
	);
}
