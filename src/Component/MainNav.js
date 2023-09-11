import * as React from "react"
import { useEffect } from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import MovieIcon from "@mui/icons-material/Movie"
import SearchIcon from "@mui/icons-material/Search"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import TvIcon from "@mui/icons-material/Tv"
import { useNavigate } from "react-router-dom"

export default function SimpleBottomNavigation() {
	const [value, setValue] = React.useState(0)
	const navigate = useNavigate()

	// useEffect(() => {
	//   if (value === 0) {
	//     history.push("/");
	//   } else if (value === 1) {
	//     history.push("/movies");
	//   } else if (value === 2) {
	//     history.push("/series");
	//   } else if (value === 3) {
	//     history.push("/search");
	//   }
	// },  [value,history]);
	useEffect(() => {
		if (value === 0) {
			navigate("/")
		} else if (value === 1) {
			navigate("/movies")
		} else if (value === 2) {
			navigate("/series")
		} else if (value === 3) {
			navigate("/search")
		}
	}, [value, navigate])

	return (
		<Box>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue)
				}}
				sx={{
					width: "100%",
					position: "fixed",
					bottom: 0,
					backgroundColor: "#242427",
					zIndex: 100,
				}}
			>
				<BottomNavigationAction
					style={{ color: "white" }}
					label="Trending"
					icon={<WhatshotIcon />}
				/>
				<BottomNavigationAction
					style={{ color: "white" }}
					label="Movies"
					icon={<MovieIcon />}
				/>
				<BottomNavigationAction
					style={{ color: "white" }}
					label="TV Series"
					icon={<TvIcon />}
				/>
				<BottomNavigationAction
					style={{ color: "white" }}
					label="Search"
					icon={<SearchIcon />}
				/>
			</BottomNavigation>
		</Box>
	)
}
