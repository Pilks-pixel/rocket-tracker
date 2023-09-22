import React from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import { useState } from "react";

function Card({ launch }) {

	const formatDate = date => {
		return date.slice(0, 10).split("-").reverse().join("-");
	};

	const date = formatDate(launch.date_utc);
	const status = launch.success ? "success" : "failure";

	return (
		<>
			<article key={launch.id} className={styles.grid__card}>
				<Image
					className={styles.img}
					src={launch.links.patch.small}
					alt='Rocket Patch'
					width={200}
					height={200}
				/>
				<h2>{launch.name} </h2>
				<div className={styles.card__content}>
					<p>Date: {date} </p>
					<p>Launch Status: {status}</p>
					<p>{launch.details} </p>
					{!launch.success && (
						<p>Failure Reason: {launch.failures[0].reason}</p>
					)}
				</div>
			</article>
		</>
	);
}

export default Card;
