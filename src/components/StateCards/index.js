import {Component} from 'react'

import './index.css'

class StateCards extends Component {
  state = {
    confirmedCard: {},
    recoveredCard: {},
    decreasedCard: {},
    activeCard: {},
  }

  componentDidMount() {
    this.totalDistricts()
  }

  totalDistricts = () => {
    const {totalStateCards} = this.props
    const districtConfirmed = totalStateCards.confirmed
    const districtRecovered = totalStateCards.recovered
    const districtDecreased = totalStateCards.decreased
    const districtActive =
      districtConfirmed - districtRecovered - districtDecreased

    const confirmedCard = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416085/Group_wu2hir.png',
      value: districtConfirmed,
    }
    const activeCard = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416117/protection_1_zbily8.png',
      value: districtActive,
    }
    const recoveredCard = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416118/recovered_1_b5nwsn.png',
      value: districtRecovered,
    }
    const decreasedCard = {
      name: 'decreased',
      logo:
        'https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416117/Corona_Virus_Symptoms_Shortness_of_breath_apqhli.png',
      value: districtDecreased,
    }

    this.setState({
      confirmedCard,
      activeCard,
      recoveredCard,
      decreasedCard,
    })
  }

  cardClick = value => {
    const {stateListCards} = this.props
    stateListCards(value)
  }

  render() {
    const {confirmedCard, recoveredCard, activeCard, decreasedCard} = this.state
    const {isStateCard} = this.props
    const isDistrictCard = isStateCard ? 'background-color' : ''
    return (
      <>
        <ul className="stateCards-container">
          <li
            className={`StateCard-background ${confirmedCard.name} ${isDistrictCard}`}
            tabIndex="-1"
            key={confirmedCard.name}
            value={confirmedCard.name}
            onClick={() => this.cardClick(confirmedCard.name)}
          >
            <div>
              <p className="home-paragraph-heading red">{confirmedCard.name}</p>
              <img
                src={confirmedCard.logo}
                alt="state specific confirmed cases pic"
                className="home-cards-logo"
              />
              <p className="paragraph-heading red">{confirmedCard.value}</p>
            </div>
          </li>

          <li
            className={`StateCard-background ${activeCard.name}`}
            tabIndex="-1"
            key={activeCard.name}
            value={activeCard.name}
            onClick={() => this.cardClick(activeCard.name)}
          >
            <div>
              <p className="home-paragraph-heading blue">{activeCard.name}</p>
              <img
                src={activeCard.logo}
                alt="state specific active cases pic"
                className="home-cards-logo"
              />
              <p className="paragraph-heading blue">{activeCard.value}</p>
            </div>
          </li>

          <li
            className={`StateCard-background ${recoveredCard.name}`}
            tabIndex="-1"
            key={recoveredCard.name}
            value={recoveredCard.name}
            onClick={() => this.cardClick(recoveredCard.name)}
          >
            <div>
              <p className="home-paragraph-heading green">
                {recoveredCard.name}
              </p>
              <img
                src={recoveredCard.logo}
                alt="state specific recovered cases pic"
                className="home-cards-logo"
              />
              <p className="paragraph-heading green">{recoveredCard.value}</p>
            </div>
          </li>

          <li
            className={`StateCard-background ${decreasedCard.name}`}
            tabIndex="-1"
            key={decreasedCard.name}
            value={decreasedCard.name}
            onClick={() => this.cardClick(decreasedCard.name)}
          >
            <div>
              <p className="home-paragraph-heading grey">
                {decreasedCard.name}
              </p>
              <img
                src={activeCard.logo}
                alt="state specific decreased cases pic"
                className="home-cards-logo"
              />
              <p className="paragraph-heading grey">{decreasedCard.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}

export default StateCards
