import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="heading">
      COVID19<span className="india-color">INDIA</span>
    </h1>
    <p className="description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="react-icons">
      <VscGithubAlt className="icons" />
      <FiInstagram className="icons" />
      <FaTwitter className="icons" />
    </div>
  </div>
)

export default Footer
