import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {TiDeleteOutline} from 'react-icons/ti'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeVideos from '../HomeVideos'

import ThemeContext from '../../context/ThemeContext'
import {
  HomeTopContainer,
  BannerContainer,
  LogosContainer,
  NxtLogoImg,
  Paragraph,
  Button,
  SearchAndIconContainer,
  SearchInput,
  SearchIconContainer,
  VideosUlListContainer,
  RenderingMultipleStates,
} from './styledComponents'
import './index.css'

class Home extends Component {
  state = {
    showBanner: true,
    videosData: [],
    searchVal: '',
    status: 'INITIAL',
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({status: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const {searchVal} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchVal}`
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
        const newData = data.videos.map(eachItem => ({
          id: eachItem.id,
          channel: eachItem.channel,
          publishedAt: eachItem.published_at,
          thumbnailUrl: eachItem.thumbnail_url,
          viewCount: eachItem.view_count,
          title: eachItem.title,
        }))
        this.setState({videosData: newData, status: 'SUCCESS'})
      } else {
        throw new Error('Failed to fetch data') // Throw error for failure
      }
    } catch (error) {
      this.setState({status: 'FAILURE'}) // Set status to failure
    }
  }

  toggleBanner = () => {
    this.setState(prevState => ({
      showBanner: !prevState.showBanner,
    }))
  }

  changeSearchValue = event => {
    this.setState({searchVal: event.target.value})
  }

  filterTheListItems = () => {
    this.getVideosData()
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
        <HomeVideos videosData={videosData} />
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
    const {showBanner, searchVal} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const color = isDark ? '#181818' : '#f9f9f9'
          const searchInputClass = isDark
            ? 'dark-search-input '
            : 'light-search-input'

          return (
            <HomeTopContainer backgroundColor={color}>
              <Header />
              {showBanner && (
                <BannerContainer>
                  <LogosContainer>
                    <NxtLogoImg src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
                    <TiDeleteOutline
                      style={{fontSize: '27px', cursor: 'pointer'}}
                      onClick={this.toggleBanner}
                    />
                  </LogosContainer>
                  <Paragraph>
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </Paragraph>
                  <Button>GET IT NOW</Button>
                </BannerContainer>
              )}
              <SearchAndIconContainer>
                <SearchInput
                  placeholder="Search"
                  type="search"
                  value={searchVal}
                  onChange={this.changeSearchValue}
                  className={searchInputClass}
                />
                <SearchIconContainer
                  onClick={this.filterTheListItems}
                  className={searchInputClass}
                >
                  <BsSearch />
                </SearchIconContainer>
              </SearchAndIconContainer>
              {this.renderMultipleStates()}
            </HomeTopContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
