import React, { useState } from 'react'
import { Carousel, ContentWrapper, SwitchTab } from "../../../Components"
import useFetch from '../../../hooks/useFetch'
const Trending = () => {
    const [endpoint, setEndPoint] = useState("day")
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    const onTabChange = (tab) => {
        setEndPoint(tab == "Day" ? "day" : "week")
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Trending
