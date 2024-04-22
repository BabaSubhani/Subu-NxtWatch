import {useContext} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  VideoListItemContainer,
  ThumbnailImg,
  ProfileImgAndDetailsContainer,
  ProfileImg,
  DetailsContainer,
  Title,
  ChannelNameViewsAndTimeContainer,
} from './styledComponents'

const HomeVideos = props => {
  const {videosData} = props
  const {isDark} = useContext(ThemeContext)
  const profileDetailsBgColor = isDark ? '#222222' : '#ffffff'

  return (
    <>
      {videosData.map(eachItem => {
        const {
          id,
          channel,
          publishedAt,
          thumbnailUrl,
          viewCount,
          title,
        } = eachItem

        // Assuming `channel` is an object with `name` and `profile_image_url` properties
        const {name, profile_image_url: profileImageUrl} = channel

        return (
          <Link
            to={`/videos/${id}`}
            style={{
              textDecoration: 'none',
              color: isDark ? '#ffffff' : '#222222',
            }}
            key={id}
          >
            <VideoListItemContainer>
              <ThumbnailImg src={thumbnailUrl} />
              <ProfileImgAndDetailsContainer
                style={{backgroundColor: {profileDetailsBgColor}}}
              >
                <ProfileImg src={profileImageUrl} />
                <DetailsContainer>
                  <Title>{title}</Title>
                  <ChannelNameViewsAndTimeContainer>
                    <li style={{listStyleType: 'none'}}>{name}</li>
                    <li style={{marginLeft: '25px'}}>{viewCount}</li>
                    <li style={{marginLeft: '25px'}}>{publishedAt}</li>
                  </ChannelNameViewsAndTimeContainer>
                </DetailsContainer>
              </ProfileImgAndDetailsContainer>
            </VideoListItemContainer>
          </Link>
        )
      })}
    </>
  )
}

export default HomeVideos
