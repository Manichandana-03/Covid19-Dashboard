import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="card-container">
    <div className="not-found-card">
      <img
        src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686537284/Group_7484_dkli4g.png"
        alt="not found"
        className="img-style"
      />
      <h4 className="heading">PAGE NOT FOUND</h4>
      <p className="description">
        we’re sorry, the page you requested could not be found <br /> Please go
        back to the homepage
      </p>

      <Link to="/" className="link-style">
        <button type="button" className="button-style">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
