import React from 'react'

function Station(props) {

  const station = props.data

  const showStationInfo = props.showStationInfo

  const color = {'R': 'red', 'G': 'green', 'B': 'blue', 'O': 'orange'}

  const s_id = 's-'+station.station_id
  const l_id = 'l-'+station.station_id
  const s_color = (props.start || props.end) ? "station-rectangle "+color[station.station_type] + " end" : "station-rectangle "+color[station.station_type]
  const l_color = "line "+color[station.station_type]

  if (props.end) {
    return (
      <div className="station-line-container">
        <div id={s_id} className="station-and-name" onClick={e => showStationInfo(station.station_id)}> {/* you should add both id and onClick to attributes */}
          <div className={s_color}>{station.station_id}</div>
          <div className="station-name">{station.station_name}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="station-line-container">
        <div id={s_id} className="station-and-name" onClick={e => showStationInfo(station.station_id)}> {/* you should add both id and onClick to attributes */}
          <div className={s_color}>{station.station_id}</div>
          <div className="station-name">{station.station_name}</div>
        </div>
        <div id={l_id} className={l_color}></div> {/* you should add both id to attributes */}
      </div>
    )
  }



}

export default Station
