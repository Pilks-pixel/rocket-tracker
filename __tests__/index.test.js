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
		render(<Home />);
	});

	it("receives an array back from API request", async () => {
		const response = await axios.get.mockResolvedValue([mockData]);

		expect(Array.isArray(response)).toBe(true);
	});

	test("error on failed api request", async () => {
		axios.get.mockRejectedValue(new Error("could not fetch data"));

		const error = await screen.findByRole("alert");
		expect(error).toBeInTheDocument();
	});
});
