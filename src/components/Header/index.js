import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-container">
    <div className="covid-container">
      <Link to="/" className="link-decoration">
        <h1 className="covid-heading">
          COVID19<span className="india-color">INDIA</span>
        </h1>
      </Link>
    </div>
    <div className="nav-menu">
      <Link to="/" className="link-decoration">
        <button type="button" className="nav-item">
          Home
        </button>
      </Link>
      <Link to="/about" className="link-decoration">
        <button type="button" className="nav-item grey">
          About
        </button>
      </Link>
    </div>
  </nav>
)

export default Header
