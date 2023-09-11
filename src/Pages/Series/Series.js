import axios from "axios"
import { useEffect, useState } from "react"
import Genres from "../../Component/Genres/Genres"
import CustomPagination from "../../Component/Pagination/CustomPagination"
import SingleContent from "../../Component/SingleContent/SingleContent"
import useGenre from "../../hooks/useGenre"

const Series = () => {
	const [genres, setGenres] = useState([])
	const [selectedGenres, setSelectedGenres] = useState([])
	const [page, setPage] = useState(1)
	const [content, setContent] = useState([])
	const [numOfPages, setNumOfPages] = useState()
	const genreforURL = useGenre(selectedGenres)

	const options = {
		method: "GET",
		url: "https://api.themoviedb.org/3/discover/tv",
		params: {
			include_adult: "false",
			include_null_first_air_dates: "false",
			language: "en-US",
			page: page,
			sort_by: "popularity.desc",
			with_genres: genreforURL,
		},
		headers: {
			accept: "application/json",
			Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjdmZTExYWE4YWNlZjEyOTU1YTAzOTc3OGUzZDM5NCIsInN1YiI6IjY0ZjhkMDg3OGUyMGM1MGNkM2VkZTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuQn7WKkUd6sb3Ymewtq-7fCzFb9m4Q7he5hvVJrKo8",
		},
	}

	useEffect(() => {
		window.scroll(0, 0)
		axios
			.request(options)
			.then(function (response) {
				setContent(response.data.results)
				setNumOfPages(response.data.total_pages)
			})
			.catch(function (error) {
				console.error(error)
			})
	}, [genreforURL, page])

	return (
		<div>
			<span className="pageTitle"><b>Discover Series</b></span>
			<Genres
				type="tv"
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
				setPage={setPage}
			/>
			<div className="trending">
				{content &&
					content?.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type="tv"
							vote_average={c.vote_average}
						/>
					))}
			</div>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	)
}

export default Series
