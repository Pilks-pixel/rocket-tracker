import React from "react";
import Image from "next/image";
import Card from "./Card";
import styles from "@/styles/Home.module.css";

function CardList({ launchInfo }) {

    console.log(launchInfo)
    
	const renderAllLaunches = launchInfo.map(launch => {
		return <Card key={launch.id} launch={launch} />;
	});



	return (
		<>
			<section className={styles.main__grid}>{renderAllLaunches}</section>
		</>
	);
}

export default CardList;
