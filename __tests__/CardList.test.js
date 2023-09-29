import { render, screen } from "@testing-library/react";
import CardList from "@/components/CardList";
import Card from "@/components/Card";
import "@testing-library/jest-dom";

describe("card list displays launch data", () => {
	const mockData = [
		{
			id: 2468,
			name: "Test Name 1",
			success: true,
			upcoming: false,
			details: "test data launch data 1",
			date_utc: "Fri, 02 Feb 2020 03:04:05 GMT",
			failures: [{ reason: "bad weather" }],
			links: {
				patch: {
					small: "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png",
				},
			},
		},
		{
			id: 4151,
			name: "Test Name 2",
			success: false,
			upcoming: false,
			details: "test data launch data 2",
			date_utc: "Sun, 31 Dec 2021 00:00:00 GMT",
			failures: [{ reason: "bad weather" }],
			links: {
				patch: {
					small: "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png",
				},
			},
		},
	];

	beforeEach(() => {
		render(<CardList launchInfo={mockData} />);
	});

	it("displays cards from props passed into component", () => {
		const cards = screen.getAllByRole("article");

		expect(cards.length).toBe(2);
	});

	it("cards have a picture", async () => {
		const cardImg = await screen.findAllByAltText("Rocket Patch");

		expect(cardImg[0]).toBeInTheDocument();
	});

	it("cards have a title", async () => {
		const cardTitle = await screen.findAllByRole("heading");

		expect(cardTitle[0]).toBeInTheDocument();
	});
});
