import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  toggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  closeMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    const homeClassName = path === '/' ? 'link-name-highlight' : 'link-name'
    const aboutClassName =
      path === '/about' ? 'link-name-highlight' : 'link-name'

    return (
      <>
        <nav className="header-list">
          <Link to="/" className="link-logo">
            <h1 className="app-name white">
              COVID19<span className="blue-text">INDIA</span>
            </h1>
          </Link>
          <ul className="nav-list">
            <Link to="/" className="link-logo">
              <li key="1">
                <button type="button" className={`${homeClassName} nav-items`}>
                  Home
                </button>
              </li>
            </Link>
            <Link to="/about" className="link-logo">
              <li key="2">
                <button type="button" className={aboutClassName}>
                  About
                </button>
              </li>
            </Link>
          </ul>
          <button
            type="button"
            className="menu-button"
            onClick={this.toggleMenu}
          >
            <img
              src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686399574/add-to-queue_1_ozrx9b.png"
              alt="menu-item"
              className="menu-image"
            />
          </button>
        </nav>
        {showMenu ? (
          <ul className="menu-list">
            <div className="menu-spacing">
              <Link to="/" className="link-item">
                <li key="1">
                  <button type="button" className={homeClassName}>
                    Home
                  </button>
                </li>
              </Link>
              <Link to="/about" className="link-item">
                <li key="2">
                  <button type="button" className={aboutClassName}>
                    About
                  </button>
                </li>
              </Link>
            </div>
            <li key="3" className="close-item">
              <button
                type="button"
                className="close-button"
                onClick={this.closeMenu}
              >
                <img
                  src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686399753/Shape_ojvjxk.png"
                  alt="close icon"
                  className="close-icon"
                />
              </button>
            </li>
          </ul>
        ) : null}
      </>
    )
  }
}

export default withRouter(Header)
