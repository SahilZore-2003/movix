import React, { useState } from 'react'
import { Carousel, ContentWrapper, SwitchTab } from "../../../Components"
import useFetch from '../../../hooks/useFetch'
const Popular = () => {
    const [endpoint, setEndPoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/popular`)
    const onTabChange = (tab) => {
        setEndPoint(tab == "Movie" ? "movie" : "tv")
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTab data={["Movie", "Tv Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} endpoint={endpoint} loading={loading} />
        </div>
    )
}

export default Popular

