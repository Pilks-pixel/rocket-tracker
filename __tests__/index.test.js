import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import axios from "axios";
jest.mock("axios");

describe("Home Display", () => {
	beforeEach(() => {
		render(<Home />);
	});

	it("homepage renders the title", () => {
		const title = screen.getByRole("heading", {
			name: /Space X Launch Tracker/i,
		});

		expect(title).toBeInTheDocument();
	});

	it("homepage renders nav", () => {
		const navBar = screen.getByRole("navigation");

		expect(navBar).toBeInTheDocument();
	});
});

describe("navigation accessibility", () => {
	beforeEach(() => {
		render(<Home />);
	});
	it("filter input is labeled", () => {
		const filterLabel = screen.getByLabelText("Filter by");

		expect(filterLabel).toBeInTheDocument();
	});

	it("search input is ARIA labeled", () => {
		const searchLabel = screen.getByLabelText("Search by launch..");

		expect(searchLabel).toBeInTheDocument();
	});
});

describe("API call", () => {
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

	beforeEach(() => {
        jest.resetAllMocks();
		render(<Home />);
	});

	it("calls API on page load", async () => {
		axios.post.mockResolvedValue({ data: mockData });

		expect(axios.post).toHaveBeenCalled();
	});

	xit("error on failed api request", async () => {
		axios.post.mockRejectedValue(new Error("could not fetch data"));

		const error = await screen.findByRole("alert");
		expect(error).toBeInTheDocument();
	});
});
