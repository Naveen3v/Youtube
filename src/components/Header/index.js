import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
import './index.css'

class Header extends Component {
  state = {theme: true}

  changeTheme = () => {
    this.setState(each => ({theme: !each.theme}))
  }

  toLogin = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {theme} = this.state
    return (
      <nav className="headerCont">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="headerlogo"
          />
        </Link>
        <ul className="logoutCont">
          <li className="headerList">
            {theme ? (
              <button
                type="button"
                className="themeBtn"
                onClick={this.changeTheme}
              >
                <FaMoon className="iconImg" />
              </button>
            ) : (
              <button
                type="button"
                className="themeBtn"
                onClick={this.changeTheme}
              >
                <BsBrightnessHigh className="iconImg" />
              </button>
            )}
          </li>
          <li className="headerList">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="headerProfileImg"
            />
          </li>
          <li className="headerList">
            <button
              type="button"
              data-testid="theme"
              className="logoutBtn"
              onClick={this.toLogin}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
