import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data

  const showStationInfo = props.showStationInfo

  const stations = []
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      stations.push(
        <Station data={data[i]} start={true} end={false} showStationInfo={showStationInfo}/>
      )
    } else if (i == data.length - 1) {
      stations.push(
        <Station data={data[i]} start={false} end={true} showStationInfo={showStationInfo}/>
      )
    } else {
      stations.push(
        <Station data={data[i]} start={false} end={false} showStationInfo={showStationInfo}/>
      )
    }
  }

  // generate many stations
  // use <Station /> with your own customized parameters
  // coding here ...
  return (
    <div className="route-graph-container">
      {stations}
    </div>
  )
}

export default RouteGraph
