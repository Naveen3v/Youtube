import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {GiCancel} from 'react-icons/gi'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Videos from '../Videos'
import SideNavbar from '../SideNavbar'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {
    premiumBanner: true,
    searchInput: '',
    apiStatus: apiStatusConstants.progress,
    videosList: [],
  }

  componentDidMount() {
    this.videosListView()
  }

  videosListView = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedDataList = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        videosList: updatedDataList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changePremiumBanner = () => {
    this.setState({premiumBanner: false})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="80" width="50" />
    </div>
  )

  videosSuccessView = () => {
    const {videosList} = this.state
    return (
      <ul className="videoListCont">
        {videosList.map(each => (
          <Videos videoDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  changeSearch = () => {
    this.videosListView()
  }

  videoFailureView = () => (
    <div className="failureCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="fail"
        className="failImg"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having trouble</p>
      <button type="button">Retry</button>
    </div>
  )

  videosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.videosSuccessView()
      case apiStatusConstants.failure:
        return this.videoFailureView()
      case apiStatusConstants.progress:
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    const {premiumBanner, searchInput} = this.state
    return (
      <div className="homeCont" data-testid="home">
        <Header />
        <div className="homeMainCont">
          <SideNavbar />

          <div className="rightCont">
            {premiumBanner && (
              <div className="premiumCont" data-testid="banner">
                <div className="premiumImgCont">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    className="premiumImg"
                    alt="nxt watch logo"
                  />
                  <button
                    type="button"
                    className="premiumBtn"
                    onClick={this.changePremiumBanner}
                    data-testid="close"
                  >
                    <GiCancel className="navtopImg" />
                  </button>
                </div>
                <p>Buy Nxt Watch Premium prepaid plans</p>
                <button type="button" className="getBtn">
                  GET IT NOW
                </button>
              </div>
            )}
            <div className="searchCont">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                className="seacrhEle"
                onChange={this.changeSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="searchImgBtn"
                onClick={this.changeSearch}
              >
                <BsSearch />
              </button>
            </div>
            {this.videosView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
