import React, { useState } from 'react'
import { Carousel, ContentWrapper, SwitchTab } from "../../../Components"
import useFetch from '../../../hooks/useFetch'
const TopRated = () => {
    const [endpoint, setEndPoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)
    const onTabChange = (tab) => {
        setEndPoint(tab == "Movie" ? "movie" : "tv")
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTab data={["Movie", "Tv Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default TopRated