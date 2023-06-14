import {Component} from 'react'
import Loader from 'react-loader-spinner'

import QuestionAnswer from '../QuestionAnswer'
import Footer from '../Footer'
import './index.css'

class AboutRoute extends Component {
  state = {
    aboutQAList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.aboutDetails()
  }

  aboutDetails = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({aboutQAList: data, isLoading: false})
    } else {
      console.log('Error')
    }
  }

  render() {
    const {isLoading, aboutQAList} = this.state
    return (
      <div className="about-container">
        {isLoading ? (
          <div className="loader-class">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <div>
              <h1 className="about-heading">About</h1>
              <p className="last-update">Last update on march 28th 2021.</p>
              <h2 className="sub-heading">
                COVID-19 vaccines be ready for distribution
              </h2>
              <ul className="ul-list">
                {aboutQAList.faq.map(eachQuestion => (
                  <QuestionAnswer
                    key={eachQuestion.qno}
                    details={eachQuestion}
                  />
                ))}
              </ul>
            </div>
            <Footer />
          </>
        )}
      </div>
    )
  }
}

export default AboutRoute
