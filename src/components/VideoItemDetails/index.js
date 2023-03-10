import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BiLike, BiDislike} from 'react-icons/bi'
import {AiFillSave} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class VideoItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.progress, vidData: {}}

  componentDidMount() {
    this.getVidItems()
  }

  getVidItems = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        vidData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  LoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="80" width="50" />
    </div>
  )

  SuccessView = () => {
    const {vidData} = this.state
    const {
      id,
      title,
      videoUrl,
      thumbnailUrl,
      name,
      profileImageUrl,
      subscriberCount,
      viewCount,
      publishedAt,
      description,
      channel,
    } = vidData
    return (
      <div className="vid-cont">
        <ReactPlayer url={videoUrl} />
        <p className="vidPara">{title}</p>
        <div className="vid2Cont">
          <ul className="vidView">
            <li className="vidList">
              <p className="vid2Para">{viewCount} views</p>
            </li>
            <li className="vidList">
              <p className="vid2Para">
                {formatDistanceToNow(new Date(publishedAt))}
              </p>
            </li>
          </ul>
          <ul className="vidLike">
            <li className="vidList">
              <BiLike className="likeIcon" />
              <button type="button" className="vidBtn">
                Like
              </button>
            </li>
            <li className="vidList">
              <BiDislike className="likeIcon" />
              <button type="button" className="vidBtn">
                DisLike
              </button>
            </li>
            <Link to="/saved-videos" className="vidLink">
              <li className="vidList">
                <AiFillSave className="likeIcon" />
                <button type="button" className="vidBtn">
                  Save
                </button>
              </li>
            </Link>
          </ul>
        </div>
        <hr className="vidHr" />
        <div className="vidBottom">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="vidBImg"
          />
          <div className="vidBCont">
            <p className="vid2Para">{channel.name}</p>
            <p className="vid2Para">{channel.subscriberCount} subscribers</p>
            <p className="vid2Para">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  FailureView = () => {}

  renderVidView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.LoaderView()
      case apiStatusConstants.success:
        return this.SuccessView()
      case apiStatusConstants.failure:
        return this.FailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="vidCont">
        <Header />
        <div className="vidSide">
          <SideNavbar />
          {this.renderVidView()}
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
