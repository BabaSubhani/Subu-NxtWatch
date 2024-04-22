import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'

import {
  VideoItemDetailsAppContainer,
  Title,
  BottomDetailsContainer,
  LikesAndDurationUl,
  ListItem,
  ChannelInformationContainer,
  LogoImg,
  ChannelAndSubscribers,
  Channel,
  Subscribers,
  Description,
  ButtonContainer,
} from './styledComponents'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    status: apiStatus.initial,
    videoItemData: {},
    isLike: true,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({status: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params // Using the id declared in the upper scope
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {video_details: videoDetails} = data
      const {
        channel,
        description,
        published_at: publishedAt,
        thumbnail_url: thumbnailUrl,
        title,
        video_url: videoUrl,
        view_count: viewCount,
      } = videoDetails
      const {name, profile_image_url: profileImageUrl} = channel
      const changeVideoDetails = {
        channel: {
          name,
          profileImageUrl,
        },
        description,
        id, // Using the id declared in the upper scope
        publishedAt,
        thumbnailUrl,
        title,
        videoUrl,
        viewCount,
      }
      console.log(changeVideoDetails)
      this.setState({
        status: apiStatus.success,
        videoItemData: changeVideoDetails,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  clickSave = id => {
    const {updateItems} = this.context
    console.log(id)
    updateItems(id)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#222222" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {videoItemData, isLike} = this.state

    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      description,
      id,
    } = videoItemData
    const {name, profileImageUrl} = videoItemData.channel
    return (
      <>
        <div
          style={{
            width: '100%',
            margin: '10 auto',
          }}
        >
          <ReactPlayer url={videoUrl} width="100%" height="250px" controls />
          <BottomDetailsContainer>
            <Title>{title}</Title>
            <LikesAndDurationUl>
              <ListItem
                style={{listStyleType: 'none', marginRight: '27px'}}
              >{`${viewCount} views`}</ListItem>
              <ListItem>{publishedAt}</ListItem>
            </LikesAndDurationUl>
            <LikesAndDurationUl>
              <ListItem style={{listStyleType: 'none', marginRight: '27px'}}>
                <ButtonContainer type="button">
                  <AiOutlineLike style={{fontSize: '23px'}} />
                </ButtonContainer>

                <p>Like</p>
              </ListItem>
              <ListItem style={{listStyleType: 'none', marginRight: '27px'}}>
                <AiOutlineDislike style={{fontSize: '23px'}} />
                <p>Dislike</p>
              </ListItem>
              <ListItem
                style={{listStyleType: 'none', marginRight: '27px'}}
                onClick={() => this.clickSave(id)}
              >
                <BiListPlus style={{fontSize: '23px'}} />
                <p>Save</p>
              </ListItem>
            </LikesAndDurationUl>
            <hr style={{marginTop: '25px'}} />

            <ChannelInformationContainer>
              <LogoImg src={profileImageUrl} />
              <ChannelAndSubscribers>
                <Channel>{name}</Channel>
                <Subscribers>sub</Subscribers>
              </ChannelAndSubscribers>
            </ChannelInformationContainer>
            <Description>{description}</Description>
          </BottomDetailsContainer>
        </div>
      </>
    )
  }

  renderMultipleStates = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoadingView()

      case apiStatus.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const containerStyles = {
            backgroundColor: isDark ? '#181818' : '#f9f9f9',
            color: isDark ? '#fff' : '#000',
          }

          return (
            <>
              <Header />
              <VideoItemDetailsAppContainer style={containerStyles}>
                {this.renderMultipleStates()}
              </VideoItemDetailsAppContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
