import React from 'react'
import "./Details.scss";
import DetailsBanner from './DetailsBanner/DetailsBanner';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import VideosSection from './VideosSection/VideosSection';
import Similar from './Carousels/Similar';
import Recommendation from './Carousels/Recommendation';

const Details = () => {

  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)

  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div className='details'>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar id={id} mediaType={mediaType} />
      <Recommendation id={id} mediaType={mediaType} />
    </div>
  )
}

export default Details
