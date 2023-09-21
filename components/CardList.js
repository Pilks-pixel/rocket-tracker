import React from "react";
import Image from "next/image";

function CardList({ launchInfo }) {
	// console.log(launchInfo[0]);

	const formatDate = date => {
		return date.slice(0, 10).split("-").reverse().join("-");
	};

	return (
		<>
			{launchInfo.map(launch => {
				const date = formatDate(launch.date_utc);
				const status = launch.success ? "success" : "failure";

				return (
					<article key={launch.id}>
						<Image
							src={launch.links.patch.small}
							alt='Rocket Patch'
							width={500}
							height={500}
						/>
						<h2>Name: {launch.name} </h2>
						<p>Date: {date} </p>
						<p>Launch Status: {status}</p>
						<p>Details: {launch.details} </p>
						{!launch.success && (
							<p>Failure Reason: {launch.failures[0].reason}</p>
						)}
					</article>
				);
			})}
		</>
	);
}

export default CardList;
