import * as React from "react"
import { useEffect, useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import { makeStyles } from "@mui/styles"
import "./ContentModal.css"
import axios from "axios"
import { img_500, unavailable, unavailableLandscape } from "../../Config/Config"
import YouTubeIcon from "@mui/icons-material/YouTube"
import Carousel from "../Carousel/Carousel"

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "90%",
		height: "80%",
		backgroundColor: "#39445a",
		border: "1px solid #282c34",
		borderRadius: 10,
		color: "white",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 3),
	},
}))

export default function ContentModal({ children, media_type, id }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [content, setContent] = useState()
	const [video, setVideo] = useState()
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const option1 = {
		method: "GET",
		url: `https://api.themoviedb.org/3/${media_type}/${id}`,
		params: { language: "en-US" },
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjdmZTExYWE4YWNlZjEyOTU1YTAzOTc3OGUzZDM5NCIsInN1YiI6IjY0ZjhkMDg3OGUyMGM1MGNkM2VkZTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuQn7WKkUd6sb3Ymewtq-7fCzFb9m4Q7he5hvVJrKo8",
		},
	}

	const option2 = {
		method: "GET",
		url: `https://api.themoviedb.org/3/${media_type}/${id}/videos`,
		params: { language: "en-US" },
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjdmZTExYWE4YWNlZjEyOTU1YTAzOTc3OGUzZDM5NCIsInN1YiI6IjY0ZjhkMDg3OGUyMGM1MGNkM2VkZTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuQn7WKkUd6sb3Ymewtq-7fCzFb9m4Q7he5hvVJrKo8",
		},
	}

	const fetchData = function () {
		axios
			.request(option1)
			.then(function (response) {
				setContent(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
	}
	const fetchVideo = function () {
		axios
			.request(option2)
			.then(function (response) {
				setVideo(response.data.results[0]?.key)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	useEffect(() => {
		fetchData()
		fetchVideo()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<div
				className="media"
				style={{ cursor: "pointer" }}
				onClick={handleOpen}
			>
				{children}
			</div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					{content && (
						<div className={classes.paper}>
							<div className="ContentModal">
								<img
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
									className="ContentModal__portrait"
								/>
								<img
									src={
										content.backdrop_path
											? `${img_500}/${content.backdrop_path}`
											: unavailableLandscape
									}
									alt={content.name || content.title}
									className="ContentModal__landscape"
								/>
								<div className="ContentModal__about">
									<span className="ContentModal__title">
										{content.name || content.title} (
										{(
											content.first_air_date ||
											content.release_date ||
											"-----"
										).substring(0, 4)}
										)
									</span>
									{content.tagline && (
										<i className="tagline">
											{content.tagline}
										</i>
									)}

									<span className="ContentModal__description">
										{content.overview}
									</span>

									<div>
										<Carousel
											id={id}
											media_type={media_type}
										/>
									</div>

									<Button
										variant="contained"
										startIcon={<YouTubeIcon />}
										color="secondary"
										target="__blank"
										href={`https://www.youtube.com/watch?v=${video}`}
									>
										Watch the Trailer
									</Button>
								</div>
							</div>
						</div>
					)}
				</Fade>
			</Modal>
		</>
	)
}
