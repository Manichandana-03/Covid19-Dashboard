import {Component} from 'react'
import {
  BarChart,
  Tooltip,
  Bar,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'
import Loader from 'react-loader-spinner'

import './index.css'

class Charts extends Component {
  state = {
    chartsList: '',
    chartsOther: '',
    isLoading: true,
  }

  componentDidMount() {
    this.chartsData()
  }

  chartsData = async () => {
    const url = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {
      method: 'GET',
    }
    const {districtCode} = this.props
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const dataObject = Object.keys(data[districtCode].dates)
      const dataState = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        decreased: data[districtCode].dates[eachDate].total.decreased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.recovered +
            data[districtCode].dates[eachDate].total.decreased),
      }))

      const dataCharts = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        decreased: data[districtCode].dates[eachDate].total.decreased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.recovered +
            data[districtCode].dates[eachDate].total.decreased),
      }))

      this.setState({
        chartsList: dataState,
        chartsOther: dataCharts,
        isLoading: false,
      })
    }
  }

  graphsList = (caseList, color) => {
    const {chartsOther} = this.state
    return (
      <div>
        <LineChart
          width={900}
          height={250}
          data={chartsOther}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={5}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  graphCharts = () => (
    <div>
      <h1 className="Charts-graph-heading">Spread Trends</h1>
      <div className="lineChart-graph">
        <div className="charts-graph-list-margin charts-graph-red">
          {this.graphsList('confirmed', '#FF073A')}
        </div>
        <div className="charts-graph-list-margin charts-graph-blue">
          {this.graphsList('active', '#007BFF')}
        </div>
        <div className="charts-graph-list-margin charts-graph-green">
          {this.graphsList('recovered', '#28A745')}
        </div>
        <div className="charts-graph-list-margin charts-graph-gray">
          {this.graphsList('decreased', '#6C757D')}
        </div>
        <div className="charts-graph-list-margin charts-graph-vi">
          {this.graphsList('tested', '#875F9A')}
        </div>
      </div>
    </div>
  )

  render() {
    const {chartsList, isLoading} = this.state

    const {districtsChart} = this.props
    console.log(districtsChart)
    const barChart = districtsChart.toLowerCase()

    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))
    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (barChart === 'active') {
      barColor = '#0A4FA0'
    } else if (barChart === 'recovered') {
      barColor = '#216837'
    } else if (barChart === 'decreased') {
      barColor = '#474C57'
    }
    return (
      <>
        {isLoading ? (
          <div className="loader-class">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div className="Charts-container">
            <div className="Charts-BarChart">
              <BarChart
                width={700}
                height={240}
                data={maxBarChart}
                barSize={35}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="eachDate"
                  stroke={`${barColor}`}
                  interval={0}
                  axisLine={false}
                  fontSize={10}
                  tickLine={0}
                  strokeWidth={1}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'upperCase',
                  }}
                  dy={10}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={barChart}
                  fill={`${barColor}`}
                  label={{position: 'top', fill: `${barColor}`, fontSize: 10}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div className="Charts-bargraph">{this.graphCharts()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Charts
