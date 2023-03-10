import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const Videos = props => {
  const {videoDetails} = props
  const {
    id,
    thumbnailUrl,
    title,
    viewCount,
    publishedAt,
    channel,
  } = videoDetails

  return (
    <Link to={`/videos/${id}`} className="linkVideos">
      <li className="videosList">
        <img src={thumbnailUrl} alt="video thumbnail" className="videoImg" />
        <div className="videoProfileCont">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="videoProfileImg"
          />
          <div className="profileText">
            <p className="profilePara">{title}</p>
            <p className="profilePara">{channel.name}</p>
            <div className="views">
              <p className="profilePara">{viewCount} views</p>
              <p className="profilePara">publishedAt</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default Videos
