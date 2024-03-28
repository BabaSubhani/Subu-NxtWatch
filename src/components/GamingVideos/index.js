import {useContext} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  VideoListItemContainer,
  ThumbnailImg,
  Title,
  ViewCount,
} from './styledComponents'

const GamingVideos = props => {
  const {videosData} = props
  const {isDark} = useContext(ThemeContext)

  return (
    <>
      {videosData.map(eachItem => {
        const {id, thumbnailUrl, viewCount, title} = eachItem

        return (
          <Link
            to={`/videos/${id}`}
            style={{textDecoration: 'none', color: isDark ? '#fff' : '#222222'}}
            key={id}
          >
            <VideoListItemContainer>
              <ThumbnailImg src={thumbnailUrl} />
              <Title>{title}</Title>
              <ViewCount>{`${viewCount} Watching Worldwide`}</ViewCount>
            </VideoListItemContainer>
          </Link>
        )
      })}
    </>
  )
}

export default GamingVideos
