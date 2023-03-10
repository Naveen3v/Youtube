import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="nfCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        className="nfImg"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found.</p>
    </div>
  </>
)

export default NotFound
