import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Component/Header/Header"
import SimpleBottomNavigation from "./Component/MainNav"
import { Container } from "@mui/material"
import Trending from "./Pages/Trending/Trending"
import Movies from "./Pages/Movies/Movies"
import Search from "./Pages/Search/Search"
import Series from "./Pages/Series/Series"
import {StyledEngineProvider} from "@mui/material"

function App() {
	return (
		<BrowserRouter>
		<StyledEngineProvider injectFirst>
			<Header />
			<div className="app">
				<Container>
					<Routes>
						<Route path="/" element={<Trending />} exact />
						<Route path="/movies" element={<Movies />} />
						<Route path="/series" element={<Series />} />
						<Route path="/search" element={<Search />} />
					</Routes>
				</Container>
			</div>
			<SimpleBottomNavigation />
		</StyledEngineProvider>
		</BrowserRouter>
	)
}

export default App
