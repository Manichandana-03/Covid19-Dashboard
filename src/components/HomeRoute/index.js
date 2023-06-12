import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import ListOfState from '../ListOfState'
import SearchState from '../SearchState'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class HomeRoute extends Component {
  state = {
    isLoading: true,
    searchInput: '',
    listOfSearchState: [],
    listOfCovidStates: [],
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDecreased: 0,
    totalActive: 0,
  }

  componentDidMount() {
    this.listOfCovidIndia()
  }

  listOfCovidIndia = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      let confirmedCases = 0
      let activeCases = 0
      let recoveredCases = 0
      let decreasedCases = 0

      statesList.forEach(stateCode => {
        if (data[stateCode.state_code]) {
          const {total} = data[stateCode.state_code]
          confirmedCases += total.confirmed ? total.confirmed : 0
          decreasedCases += total.decreased ? total.decreased : 0
          recoveredCases += total.recovered ? total.recovered : 0
        }
      })
      activeCases += confirmedCases - (recoveredCases + decreasedCases)

      const listOfCovidTableStates = statesList.map(eachItem => ({
        stateName: eachItem.state_name,
        stateCode: eachItem.state_code,
        listOfConfirmed: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.confirmed),
        listOfRecovered: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.recovered),
        listOfDecreased: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.decreased),
        listOfOther: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.other),
        listOfPopulation: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].meta.population),
      }))

      this.setState({
        totalConfirmed: confirmedCases,
        totalDecreased: decreasedCases,
        totalRecovered: recoveredCases,
        totalActive: activeCases,
        isLoading: false,
        listOfCovidStates: listOfCovidTableStates,
      })
    }
  }

  searchInputList = event => {
    const search = event.target.value
    const searchList = statesList.filter(eachItem =>
      eachItem.state_name.toLowerCase().includes(search.toLowerCase()),
    )
    return this.setState({
      searchInput: event.target.value,
      listOfSearchState: searchList,
    })
  }

  loadingFalse = () => {
    this.setState({isLoading: false})
  }

  searchInputRemove = () => {
    this.setState({listOfSearchState: []})
  }

  ascSortClicked = () => {
    const {listOfCovidStates} = this.state
    const sort = listOfCovidStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({listOfCovidStates: sort})
  }

  decSortClicked = () => {
    const {listOfCovidStates} = this.state
    const sort = listOfCovidStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({listOfCovidStates: sort})
  }

  listOfStateTable = () => {
    const {listOfCovidStates} = this.state
    return (
      <div className="state-table">
        <div className="state-result-heading">
          <div className="state-ul-container">
            <p className="home-table-state-paragraph">States/UT</p>
            <button
              type="button"
              className="icon-button"
              onClick={this.ascSortClicked}
            >
              <FcGenericSortingAsc className="ascending-icon" />
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={this.decSortClicked}
            >
              <FcGenericSortingDesc className="descending-icon" />
            </button>
          </div>
          <p className="general-column-title">Confirmed</p>
          <p className="general-column-title">Active</p>
          <p className="general-column-title">Recovered</p>
          <p className="general-column-title">Decreased</p>
          <p className="general-column-title">Population</p>
        </div>
        <ul className="state-result-table">
          {listOfCovidStates.map(eachItem => (
            <ListOfState key={eachItem.stateCode} stateList={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  listOfSearch = () => {
    const {listOfSearchState} = this.state
    return (
      <ul className="search-container">
        {listOfSearchState.map(eachItem => (
          <SearchState
            stateName={eachItem.state_name}
            stateCode={eachItem.state_code}
            key={eachItem.state_code}
            id={eachItem.state_code}
          />
        ))}
      </ul>
    )
  }

  listOfCovidCards = () => {
    const {
      totalConfirmed,
      totalActive,
      totalDecreased,
      totalRecovered,
    } = this.state

    return (
      <>
        <div className="card-container-row">
          <div className="card-list">
            <p className="home-paragraph-heading red">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416085/Group_wu2hir.png"
              alt="country wide confirmed cases pic"
              className="home-cards-logo"
            />
            <p className="paragraph-heading red">{totalConfirmed}</p>
          </div>
          <div className="card-list">
            <p className="home-paragraph-heading blue">Active</p>
            <img
              src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416117/protection_1_zbily8.png"
              alt="country wide active cases pic"
              className="home-cards-logo"
            />
            <p className="paragraph-heading blue">{totalActive}</p>
          </div>
          <div className="card-list">
            <p className="home-paragraph-heading green">Recovered</p>
            <img
              src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416118/recovered_1_b5nwsn.png"
              alt="country wide recovered cases pic"
              className="home-cards-logo"
            />
            <p className="paragraph-heading green">{totalRecovered}</p>
          </div>
          <div className="card-list">
            <p className="home-paragraph-heading gray">Decreased</p>
            <img
              src="https://res.cloudinary.com/dfaxacnyf/image/upload/v1686416117/Corona_Virus_Symptoms_Shortness_of_breath_apqhli.png"
              alt="country wide decreased cases pic"
              className="home-cards-logo"
            />
            <p className="paragraph-heading gray">{totalDecreased}</p>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, listOfSearchState, searchInput} = this.state
    const searchResult =
      listOfSearchState.length === 0 ? '' : this.listOfSearch()
    return (
      <div className="covid-home-container">
        {isLoading ? (
          <div className="loader-class">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="home-search">
              <div className="home-search-container">
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="Enter the State"
                  className="search-input"
                  onChange={this.searchInputList}
                />
              </div>
              {searchInput.length > 0 ? searchResult : ''}
            </div>
            {this.listOfCovidCards()}
            {this.listOfStateTable()}
            <Footer />
          </>
        )}
      </div>
    )
  }
}

export default HomeRoute
