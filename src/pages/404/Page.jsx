import React from 'react'
import "./Page.scss"

import { ContentWrapper } from '../../Components'
const Page = () => {
 
  return (
    <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
  )
}

export default Page
