import './index.css'

const IndiaStats = props => {
  const {covidData, statesList} = props

  let confirmedCases = 0
  let activeCases = 0
  let decreasedCases = 0
  let recoveredCases = 0

  statesList.forEach(eachState => {
    if (covidData[eachState.state_code]) {
      const {total} = covidData[eachState.state_code]
      confirmedCases += total.confirmed ? total.confirmed : 0
      decreasedCases += total.decreased ? total.decreased : 0
      recoveredCases += total.recovered ? total.recovered : 0
    }
  })
  activeCases += confirmedCases - (recoveredCases + decreasedCases)

  return (
    <div className="stats-container">
      <div className="card-container">
        <p>Confirmed</p>
        <img
          src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686385412/Outline_afhium.jpg"
          alt="confirmed"
        />
        <p>{confirmedCases}</p>
      </div>

      <div className="card-container">
        <p>Active</p>
        <img
          src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686385412/Outline_afhium.jpg"
          alt="active"
        />
        <p>{activeCases}</p>
      </div>

      <div className="card-container">
        <p>Recovered</p>
        <img
          src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686385412/Outline_afhium.jpg"
          alt="recovered"
        />
        <p>{recoveredCases}</p>
      </div>

      <div className="card-container">
        <p>Decreased</p>
        <img
          src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686385412/Outline_afhium.jpg"
          alt="decreased"
        />
        <p>{decreasedCases}</p>
      </div>
    </div>
  )
}

export default IndiaStats
