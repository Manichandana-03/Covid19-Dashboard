import {Link} from 'react-router-dom'

import './index.css'

const ListOfState = props => {
  const {stateList} = props
  const {
    stateCode,
    stateName,
    listOfConfirmed,
    listOfRecovered,
    listOfOther,
    listOfDecreased,
    listOfPopulation,
  } = stateList
  const active =
    listOfConfirmed - listOfRecovered - listOfDecreased - listOfOther

  return (
    <li className="list-state-class">
      <Link to={`/state/${stateCode}`} className="link-class">
        <p className="state-name-class">{stateName}</p>
      </Link>
      <p className="state-confirmed">{listOfConfirmed}</p>
      <p className="state-active">{active}</p>
      <p className="state-recovered">{listOfRecovered}</p>
      <p className="state-decreased">{listOfDecreased}</p>
      <p className="state-population">{listOfPopulation}</p>
    </li>
  )
}

export default ListOfState
