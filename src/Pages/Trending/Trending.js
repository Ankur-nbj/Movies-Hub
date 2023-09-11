import axios from "axios"
import "./Trending.css"
import { useEffect, useState } from "react"
import SingleContent from "../../Component/SingleContent/SingleContent.js"
import CustomPagination from "../../Component/Pagination/CustomPagination"

const Trending = () => {
	const [page, setPage] = useState(1)
	const [content, setContent] = useState([])

	const options = {
		method: "GET",
		url: "https://api.themoviedb.org/3/trending/all/day",
		params: { language: "en-US", page: page },
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjdmZTExYWE4YWNlZjEyOTU1YTAzOTc3OGUzZDM5NCIsInN1YiI6IjY0ZjhkMDg3OGUyMGM1MGNkM2VkZTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuQn7WKkUd6sb3Ymewtq-7fCzFb9m4Q7he5hvVJrKo8",
		},
	}

	useEffect(() => {
		window.scroll(0, 0)
		axios
			.request(options)
			.then(function (response) {
				setContent(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
		// eslint-disable-next-line
	}, [page])

	return (
		<div>
			<span className="pageTitle"><b>Trending Today</b></span>
			<div className="trending">
				{content &&
					content?.results?.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={c.media_type}
							vote_average={c.vote_average}
						/>
					))}
			</div>
			<CustomPagination setPage={setPage} />
		</div>
	)
}
export default Trending
