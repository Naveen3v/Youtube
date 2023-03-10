import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import SideNavbar from '../SideNavbar'
import Header from '../Header'
import './index.css'

class SavedVideos extends Component {
  state = {svList: []}

  svFailure = () => (
    <div className="svfailCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="fail"
        className="svfailImg"
      />
      <h1 className="nsvPara">No saved videos found</h1>
      <p className="nsvPara">You can save your videos while watching them</p>
    </div>
  )

  displaysvView = () => {
    const {svList} = this.state
    switch (svList) {
      case svList.length === 0:
        return this.svFailure()
      case svList.length !== 0:
        return this.svSuccess()
      default:
        return null
    }
  }

  render() {
    const {svList} = this.state
    return (
      <div className="svmCont">
        <Header />
        <div className="svCont">
          <SideNavbar />
          <div className="svright">
            <div className="svmHeading">
              <HiFire className="svtopImg" />
              <h1 className="svmheading">Saved Videos</h1>
            </div>
            {this.displaysvView()}
          </div>
        </div>
      </div>
    )
  }
}

export default SavedVideos
