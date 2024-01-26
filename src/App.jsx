import { useState, useEffect } from "react"
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { Header, Footer } from "./Components";
import Home from "./pages/home/Home";
import Page from "./pages/404/Page";
import Details from "./pages/details/Details";
import Search from "./pages/searchResult/Search"
import Explore from "./pages/explore/Explore"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const dispatch = useDispatch()
  const { url } = useSelector(state => state.home)
  const [data, setData] = useState([])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((data) => {
        const url = {
          backdrop: data?.images?.secure_base_url + "original",
          poster: data?.images?.secure_base_url + "original",
          profile: data?.images?.secure_base_url + "original"

        }
        dispatch(getApiConfiguration(url))
      })
      .catch(err => console.log(err))
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({ genres }) => {
      genres.map((item) => allGenres[item.id] = item)
    })

    dispatch(getGenres(allGenres))
  }




  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Page />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
