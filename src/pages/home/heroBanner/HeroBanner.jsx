import React, { useState, useEffect } from 'react'
import "./HeroBanner.scss"
import { useNavigate } from "react-router-dom"
import useFetch from "../../../hooks/useFetch";
import { useSelector } from 'react-redux';
import { Img, ContentWrapper } from "../../../Components"

const HeroBanner = () => {
  const navigate = useNavigate()
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch("/movie/upcoming")

  const { url } = useSelector(state => state.home)

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])

  return (
    <div className='hero-banner'>
      {
        !loading && <div className="backdrop-img">
          <Img src={background} />
        </div>
      }

      <div className="opacity-layer">

      </div>

      <ContentWrapper>
        <div className="wrapper">
          <div>
            <h1>Welcome</h1>
            <h4>Millions of movies, Tv shows and people to discover. Explore Now</h4>
            <div className="search-box">
              <input
                type="text"
                value={query}
                onKeyUp={(e) => searchQueryHandler(e)}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for a movie or tv show' />
              <button onClick={() => navigate(`/search/${query}`)}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>


    </div>
  )
}

export default HeroBanner
