# SpaceX launch tracker

![project page screenshot](/public/screenshot.png)

## Deployment

:rocket: **Deployed** with Vercel at [rocket tracker](https://rocket-tracker.vercel.app/)

## About

This app tracks rocket launches from the [space X API](https://github.com/r-spacex/SpaceX-API). The fetched data can be searched or filtered by user input and is also **mobile responsive**.

## Instructions

Clone down to local machine, `npm install` and `cd space_app`

`npm run dev` to run in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Technologies

I built this app with **Javascript** in the **React / Next.js** framework. I've chosen React because it allows for reusable components, meaning I could keep my files smaller with more readable code and use where necessary in the app. While Next.js gave added features, such as a built in image component. Which optimized images automatically to next gen formats like WEBP. I felt this was important as the app would be rendering multiple images at the same time from the fetched data.

For fetching from the API, **Axios** was used to enable automatic JSON parsing, allowing a cleaner syntax.

To optimize rendering performance, I've paginated the returned data and used the NPM package **React-Paginate** to provide less verbose page button functionality.

Testing was done with **Jest** to give a clear way to test code correctness.

## Wins

-[x] Successfully fetched data from the API with a query to optimize results for only required parameters.

-[x] Results can be filtered and searched, according to user input.

-[x] Functions kept pure and with single responsibility where possible for DRY & KISS code principles.  

-[x] Mobile First Design, with CSS Grid and modern CSS functions. Therefore I was able to reduce use of media queries.

## Challenges

-[x] Testing with Jest, I was unable to get more tests to pass because I struggled mocking the API call to my components. However as my first experience with testing I can now appreciate its value for improved code confidence & scalability. I look forward to more exposure with this technology.


## Significant code
```javascript
// useEffect with filter functions and ternary operator handled user input without any side effects on the original API data. 
	useEffect(() => {
		const filterBySuccess = apiData.filter(launchItem => {
			return launchItem.success;
		});

		const filterByFailure = apiData.filter(launchItem => {
			return !launchItem.success;
		});

		const filterByUpcoming = apiData.filter(launchItem => {
			return launchItem.upcoming;
		});

		dataQuery === "success"
			? setFilteredData(filterBySuccess)
			: dataQuery === "upcoming"
			? setFilteredData(filterByUpcoming)
			: dataQuery === "failed"
			? setFilteredData(filterByFailure)
			: setFilteredData(apiData);
	}, [dataQuery, apiData]);

```