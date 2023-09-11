import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Component/Header/Header"
import SimpleBottomNavigation from "./Component/MainNav"
import { Container } from "@mui/material"
import Trending from "./Pages/Trending/Trending"
import Movies from "./Pages/Movies/Movies"
import Search from "./Pages/Search/Search"
import Series from "./Pages/Series/Series"

function App() {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	)
}

export default App
