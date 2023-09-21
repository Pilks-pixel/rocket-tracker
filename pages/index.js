import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (

//     async function getRocketData() {
// 		try {
// 			const url = "https://api.spacexdata.com/v5/launches";
// 			const response = await axios.get(url);
// 			return response.data.slice(0, 2)
// 		} catch (error) {
// 			console.error(error);
// 		}
//  }


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
				<section className={styles.main__container}></section>

				<footer>Made by Pete</footer>
			</main>
		</>
	);
}
