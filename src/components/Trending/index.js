import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import TrendingItem from '../TrendingItem'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConstants.progress, trendingList: []}

  componentDidMount() {
    this.getTrendingVideosList()
  }

  getTrendingVideosList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingList: updatedData,
      })
    }
  }

  LoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="80" width="50" />
    </div>
  )

  SuccessTrending = () => {
    const {trendingList} = this.state
    return (
      <ul className="treListCont">
        {trendingList.map(each => (
          <TrendingItem trendDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  FailureTrending = () => {}

  displayTrend = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.LoaderView()
      case apiStatusConstants.success:
        return this.SuccessTrending()
      case apiStatusConstants.failure:
        return this.FailureTrending()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="treCont">
        <Header />
        <div className="treMainCont">
          <SideNavbar />
          <div className="trending">
            <div className="tremainHeading">
              <HiFire className="trendingImg" />
              <h1 className="trendingHeading">Trending</h1>
            </div>
            {this.displayTrend()}
          </div>
        </div>
      </div>
    )
  }
}

export default Trending
