import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    showPassword: true,
  }

  changePasswordElement = () => {
    this.setState(each => ({
      showPassword: !each.showPassword,
    }))
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showError, errorMsg, showPassword} = this.state
    return (
      <div className="mainCont">
        <div className="formCont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logoImg"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <label className="formlabel" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="input"
              placeholder="Username"
              onChange={this.changeUsername}
            />

            <label className="formlabel" htmlFor="password">
              PASSWORD
            </label>
            {showPassword ? (
              <input
                type="password"
                id="password"
                value={password}
                className="input"
                placeholder="Password"
                onChange={this.changePassword}
              />
            ) : (
              <input
                type="text"
                id="password"
                value={password}
                className="input"
                placeholder="Password"
                onChange={this.changePassword}
              />
            )}
            <div className="checkboxCont">
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.changePasswordElement}
              />
              <label className="formlabel" htmlFor="checkbox">
                Show Password
              </label>
            </div>
            <button type="submit" className="loginBtn">
              Login
            </button>
            {showError && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
