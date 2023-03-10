import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const TrendingItem = props => {
  const {trendDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = trendDetails

  return (
    <Link to={`/videos/${id}`} className="tiLink">
      <li className="trendList">
        <img src={thumbnailUrl} alt="video thumbnail" className="trendImg" />
        <div className="trendText">
          <p className="trendHeading">{title}</p>
          <p className="trendPara">{channel.name}</p>
          <div className="treView">
            <p className="trendPara">{viewCount}views</p>
            <p className="trendPara">{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingItem
