import {Link} from 'react-router-dom'
import './index.css'

const GamingItem = props => {
  const {gamDetails} = props
  const {id, thumbnailUrl, title, viewCount} = gamDetails
  return (
    <Link to={`/videos/${id}`} className="gamLink">
      <li className="gamList">
        <img src={thumbnailUrl} alt="video thumbnail" className="gamImg" />
        <p className="gamHead">{title}</p>
        <p className="gamPara">{viewCount} Watching Worldwide</p>
      </li>
    </Link>
  )
}
export default GamingItem
