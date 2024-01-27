import React, { useRef } from 'react'
import "./Carousel.scss"
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ContentWrapper, Img, CircleRating, Genres } from "../../Components";
import PosterFallback from "../../assets/no-poster.png";


const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef(null)
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate()

    if (endpoint == "day" || endpoint == "week") {
        endpoint = "movie"
    }


    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skeleton = () => {
        return (
            <div className='skeletonItem'>
                <div className='posterBlock skeleton'></div>
                <div className='textBlock'>
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
    return (
        <div className='carousel'>
            <ContentWrapper>
                {title && data?.length > 0 ? <div className='carouselTitle'>{title}</div> : ""}
                
                {
                    data?.length > 0 &&
                    <>
                        <BsFillArrowLeftCircleFill onClick={() => navigation("left")} className='arrow carouselLeftNav' />
                        <BsFillArrowRightCircleFill onClick={() => navigation("right")} className='arrow carouselRighttNav' />
                    </>


                }

                {
                    !loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {
                                data?.map((item) => {
                                    const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                    return (
                                        <div key={item.id} className="carouselItem" onClick={() => navigate(`/${endpoint}/${item.id}`)}>
                                            <div className="posterBlock">
                                                <Img src={posterUrl} />
                                                <CircleRating rating={item?.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>
                                            <div className="textBlock">
                                                <div className="title">
                                                    {item.title || item.name}
                                                </div>
                                                <div className="date">
                                                    {
                                                        dayjs(item.release_Date).format("MMM D, YYYY")
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className='loadingSkeleton'>
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel
