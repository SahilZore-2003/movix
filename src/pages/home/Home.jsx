import React from 'react'
import "./Home.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './Trending/Trending'
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'
const Home = () => {
  return (
    <div className='home-page'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home
