import React from "react";
import Card from "./Card";
import styles from "@/styles/Home.module.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";

function CardList({ launchInfo }) {
	const [currentPage, setCurrentPage] = useState(0);
	const cardsPerPage = 10;
	const pageRange = currentPage * cardsPerPage;
	const pageCount = Math.ceil(launchInfo.length / cardsPerPage);

	// Display Cards With Pagination Logic
	const handlePageClick = ({ selected }) => {
		setCurrentPage(selected);
	};

	const paginateLaunches = launchInfo.slice(
		pageRange,
		pageRange + cardsPerPage
	);

	const renderCards = paginateLaunches.map(launch => {
		return <Card key={launch.id} launch={launch} />;
	});

	return (
		<>
			<section className={styles.main__grid}>
				{renderCards}
				<ReactPaginate
					pageCount={pageCount}
					previousLabel='< previous'
					nextLabel='next >'
					breakLabel='...'
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					renderOnZeroPageCount={null}
					containerClassName={styles.grid__pagination}
					previousLinkClassName={styles.pagination__backBtn}
					nextLinkClassName={styles.pagination__nextBtn}
					activeLinkClassName={styles.pagination__activeBtn}
				/>
			</section>
		</>
	);
}

export default CardList;
