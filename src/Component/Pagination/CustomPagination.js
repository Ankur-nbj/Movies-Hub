import * as React from "react"
import Pagination from "@mui/material/Pagination"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const lightTheme = createTheme({
	palette: {
		type: "light",
		color: "white"
	},
})

export default function CustomPagination({ setPage, numOfPages = 10 }) {
	const handlePageChange = (page) => {
		setPage(page)
		window.scroll(0, 0)
	}
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				color: "white",
				marginTop: 10,
			}}
		>
			<ThemeProvider theme={lightTheme}>
				<Pagination
					onChange={(e) => handlePageChange(e.target.textContent)}
					count={numOfPages}
					style={{color: "white"}}
					color="primary"
					hideNextButton
					hidePrevButton
				/>
			</ThemeProvider>
		</div>
	)
}
