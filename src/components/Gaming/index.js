import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaHeart} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import GamingVideos from '../GamingVideos'
import ThemeContext from '../../context/ThemeContext'

import {
  TrendingTopContainer,
  TrendingNameAndImgContainer,
  VideosUlListContainer,
  TrendingText,
  Button,
  RenderingMultipleStates,
} from './styledComponents'

class Gaming extends Component {
  state = {
    videosData: [],
    status: 'INITIAL', // Add status to track API status
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({status: 'LOADING'}) // Set status to loading
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const newData = data.videos.map(eachItem => ({
          id: eachItem.id,

          thumbnailUrl: eachItem.thumbnail_url,
          viewCount: eachItem.view_count,
          title: eachItem.title,
        }))
        this.setState({videosData: newData, status: 'SUCCESS'}) // Set status to success
      } else {
        throw new Error('Failed to fetch data') // Throw error for failure
      }
    } catch (error) {
      this.setState({status: 'FAILURE'}) // Set status to failure
    }
  }

  renderLoadingView = () => (
    <RenderingMultipleStates style={{marginTop: '30px'}}>
      <Loader type="ThreeDots" color="#222222" height={50} width={50} />
    </RenderingMultipleStates>
  )

  renderFailureView = () => (
    <RenderingMultipleStates>
      <div className="failure-view">
        <h1>Failed to fetch data</h1>
        <Button onClick={this.getVideosData}>Retry</Button>
      </div>
    </RenderingMultipleStates>
  )

  renderSuccessView = () => {
    const {videosData} = this.state
    console.log(videosData)

    return (
      <VideosUlListContainer>
        <GamingVideos videosData={videosData} />
      </VideosUlListContainer>
    )
  }

  renderMultipleStates = () => {
    const {status} = this.state
    switch (status) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      return <Redirect to="/login" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const containerStyles = {
            backgroundColor: isDark ? '#181818' : '#f9f9f9',
            color: isDark ? '#fff' : '#000',
          }

          return (
            <TrendingTopContainer style={containerStyles}>
              <Header />
              <TrendingNameAndImgContainer>
                <FaHeart
                  style={{
                    color: 'red',
                    fontSize: '40px',
                    backgroundColor: '#d7dfe9',
                    height: '35px',
                    width: '35px',
                    borderRadius: '50px',
                    padding: '5px',
                  }}
                />
                <TrendingText>Gaming</TrendingText>
              </TrendingNameAndImgContainer>
              {this.renderMultipleStates()}
            </TrendingTopContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
