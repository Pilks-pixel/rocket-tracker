import { render, screen } from "@testing-library/react";
import CardList from "@/components/CardList";
import Card from "@/components/Card";
import "@testing-library/jest-dom";


describe('card list displays launch data', () => {

  const mockData = [
		{
			id: 2468,
			name: "Test Name 1",
			success: true,
			details: "test data launch data 1",
		},
		{
			id: 4151,
			name: "Test Name 2",
			success: false,
			details: "test data launch data 2",
		},
	];
    
    it("displays cards from props passed into component", () => {
			render(<CardList launchInfo={mockData} />);

			const cards = screen.getAllByRole('article');
			expect(cards.length).toBe(2);
		});
})