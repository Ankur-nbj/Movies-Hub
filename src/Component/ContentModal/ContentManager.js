import React from "react"
import { createTheme, ThemeProvider } from "@mui/material"

import ContentModal from "./ContentModal"

const theme = createTheme()

const ContentManager = (props) => {
	return (
		<ThemeProvider theme={theme}>
			<ContentModal {...props} />
		</ThemeProvider>
	)
}

export default ContentManager
