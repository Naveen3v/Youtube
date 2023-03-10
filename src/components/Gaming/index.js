import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import GamingItem from '../GamingItem'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.progress, gamingList: []}

  componentDidMount() {
    this.getGamingList()
  }

  retry = () => {
    this.getGamingList()
  }

  getGamingList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        gamingList: updatedData,
      })
    }
  }

  gamingSuccessView = () => {
    const {gamingList} = this.state
    return (
      <div className="gamsucCont">
        <ul className="gamListCont">
          {gamingList.map(each => (
            <GamingItem gamDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  gamingFailureView = () => (
    <div className="gamFail">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failImg"
      />
      <h1 className="gamFailPara">Oops! Something Went Wrong</h1>
      <p className="gamFailPara">We are having some trouble</p>
      <button type="button" className="retryBtn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  LoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="80" width="50" />
    </div>
  )

  gamingContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.LoaderView()
      case apiStatusConstants.success:
        return this.gamingSuccessView()
      case apiStatusConstants.failure:
        return this.gamingFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="gammainCont">
        <Header />
        <div className="gamCont">
          <SideNavbar />
          <div className="gamingCont">
            <div className="gammainHeading">
              <SiYoutubegaming className="gamingImg" />
              <h1 className="gamhead">Gaming</h1>
            </div>

            {this.gamingContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default Gaming
