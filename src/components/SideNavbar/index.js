import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {GiCancel} from 'react-icons/gi'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const SideNavbar = () => (
  <nav className="leftCont">
    <ul className="navtop">
      <Link to="/" className="homeLink">
        <li className="navtopList">
          <AiFillHome className="navtopImg" />
          <h1 className="navtopheading">Home</h1>
        </li>
      </Link>
      <Link to="/trending" className="homeLink">
        <li className="navtopList">
          <HiFire className="navtopImg" />
          <h1 className="navtopheading">Trending</h1>
        </li>
      </Link>
      <Link to="/gaming" className="homeLink">
        <li className="navtopList">
          <SiYoutubegaming className="navtopImg" />
          <h1 className="navtopheading">Gaming</h1>
        </li>
      </Link>
      <Link to="/saved-videos" className="homeLink">
        <li className="navtopList">
          <HiFire className="navtopImg" />
          <h1 className="navtopheading">Saved videos</h1>
        </li>
      </Link>
    </ul>
    <div className="navbottom">
      <p className="navbottomHeading">CONTACT US</p>
      <div className="navbottomImg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="bottomImg"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="bottomImg"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="bottomImg"
        />
      </div>
      <p className="navbottomPara">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </nav>
)
export default SideNavbar
