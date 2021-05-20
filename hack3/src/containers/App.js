import React, { useState, useEffect } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

function App() {
  // sample structure of data
  // data: {
    //   R: [],
    //   G: []
    // }
    const [data, setData] = useState({}) // all MRT station data
    const [current_station_id, setCurrentStationId] = useState('None') // station clicked by cursor
    const [start_station, setStartStation] = useState('') // station selected as the starting one
    const [end_station, setEndStation] = useState('') // station selected as the ending one
    const [distance, setDistance] = useState(-2) // distance shown on the screen
    
    const station_type = current_station_id[0] // R10, station_type = R
    const station_order = current_station_id.slice(1, current_station_id.length) // R10, station_order = 10
    const station_info = current_station_id[0] !== 'N' ? data[station_type][parseInt(station_order) - 1] : null // get certain station information
    
    const [answerClassName, setAnswerClassName] = useState('')


  const showStationInfo = (e) => {
    setCurrentStationId(e)
  }

  const getStations = async () => {
    // fetch data from database via backend
    // coding here ...
    const {data} = await instance.get('/getStations')
    setData(data.data);
  }

  useEffect(() => {
      getStations()
  }, [])

  const calculateDistance = async () => {
    // send start and end stations to backend and get distance
    // coding here ...
    // console.log(`/calculateDistance?start=${start_station}&end=${end_station}`)
    const {data} = await instance.get(`/calculateDistance?start=${start_station}&end=${end_station}`)
    const dist = data.distance
    if (dist == -2){
      setDistance('')
      setAnswerClassName('')
    } else if (dist == -1) {
      setDistance('INVALID')
      setAnswerClassName('invalid')
    } else {
      setDistance(dist)
      setAnswerClassName('')
    }
  }

  // fetch data here after 1st render
  // coding here ...

  if (!Object.keys(data).length) {
    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      <div className="calculator-container">
        <div className="mode-selector">
          
          <span id="start-station-span">起始站</span>
          <select id="start-select" className="start-station" onChange={(e) => setStartStation(e.target.value)}> {/* you should add both onChange and value to attributes */}
            <option></option>
            <optgroup label={Object.keys(data)[0]}>
              {data[Object.keys(data)[0]].map(station => {
                return (
                  <option id={`start-group-${station.station_id}`} value={station.station_id}>{station.station_name}</option>
                )
              })}
            </optgroup>
            <optgroup label={Object.keys(data)[1]}>
              {data[Object.keys(data)[1]].map(station => {
                return (
                  <option id={`start-group-${station.station_id}`} value={station.station_id}>{station.station_name}</option>
                )
              })}
            </optgroup>
          </select>

          <span id="end-station-span">終點站</span>
          <select id="end-select" className="end-station" onChange={(e) => setEndStation(e.target.value)}> {/* you should add both onChange and value to attributes */}
            <option></option>
            <optgroup label={Object.keys(data)[0]}>
              {data[Object.keys(data)[0]].map(station => {
                return (
                  <option id={`end-group-${station.station_id}`} value={station.station_id}>{station.station_name}</option>
                )
              })}
            </optgroup>
            <optgroup label={Object.keys(data)[1]}>
              {data[Object.keys(data)[1]].map(station => {
                return (
                  <option id={`end-group-${station.station_id}`} value={station.station_id}>{station.station_name}</option>
                )
              })}
            </optgroup>
          </select>

          <button onClick={calculateDistance} id="search-btn">查詢距離</button>
          <span id="answer" className={answerClassName}> {/* you should add className to attributes */}
            {distance != -2 && distance}
          </span>
          <span id="answer-postfix">KM</span>
        </div>

        <div className="route-graph-info-container">
          <RouteGraph route_data={data[Object.keys(data)[0]]} showStationInfo={showStationInfo} /> {/* you should pass data to child component with your own customized parameters */}
          <RouteGraph route_data={data[Object.keys(data)[1]]} showStationInfo={showStationInfo} /> {/* you should pass data to child component with your own customized parameters */}
          <StationInfo station_info={station_info}/> {/* you should pass data to child component with your own customized parameters */}
        </div>
        
      </div>
    </div>
  )
}

export default App
