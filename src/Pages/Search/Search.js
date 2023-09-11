import { Button, Tab, Tabs, TextField } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./Search.css"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useState } from "react"
import axios from "axios"
import CustomPagination from "../../Component/Pagination/CustomPagination"
import SingleContent from "../../Component/SingleContent/SingleContent"

const Search = () => {
	const [type, setType] = useState(0)
	const [searchText, setSearchText] = useState("")
	const [page, setPage] = useState(1)
	const [content, setContent] = useState([])
	const [numOfPages, setNumOfPages] = useState()

	const darkTheme = createTheme({
		palette: {
			type: "dark",
			primary: {
				main: "#fff",
			},
		},
	})

	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}`,
		params: { query: searchText, include_adult: "true", page: page },
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjdmZTExYWE4YWNlZjEyOTU1YTAzOTc3OGUzZDM5NCIsInN1YiI6IjY0ZjhkMDg3OGUyMGM1MGNkM2VkZTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuQn7WKkUd6sb3Ymewtq-7fCzFb9m4Q7he5hvVJrKo8",
		},
	}

	const search = function () {
		axios
			.request(options)
			.then(function (response) {
				console.log(response.data)
				setContent(response.data.results)
				setNumOfPages(response.data.total_pages)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	useEffect(() => {
		window.scroll(0, 0)
		search()
		// eslint-disable-next-line
	}, [type, page])

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<div className="search">
					<TextField
						style={{ flex: 1, backgroundColor:"white" }}
						className="searchBox"
						label="Search"
						variant="filled"
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Button
						onClick={search}
						variant="contained"
						style={{ marginLeft: 10}}
					>
						<SearchIcon fontSize="large" />
					</Button>
				</div>
				<Tabs
					value={type}
					indicatorColor="primary"
					textColor="primary"
					onChange={(event, newValue) => {
						setType(newValue)
						setPage(1)
					}}
					style={{ paddingBottom: 5 }}
					aria-label="disabled tabs example"
				>
					<Tab style={{ width: "50%", color:"white" }} label="Search Movies" />
					<Tab style={{ width: "50%", color: "white" }} label="Search TV Series" />
				</Tabs>
			</ThemeProvider>
			<div className="trending">
				{content &&
					content?.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={type ? "tv" : "movie"}
							vote_average={c.vote_average}
						/>
					))}
				{searchText &&
					!content &&
					(type ? (
						<h2>No Series Found</h2>
					) : (
						<h2>No Movies Found</h2>
					))}
			</div>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	)
}

export default Search

/*
api key eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjdmZTExYWE4YWNlZjEyOTU1YTAzOTc3OGUzZDM5NCIsInN1YiI6IjY0ZjhkMDg3OGUyMGM1MGNkM2VkZTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuQn7WKkUd6sb3Ymewtq-7fCzFb9m4Q7he5hvVJrKo8
*/