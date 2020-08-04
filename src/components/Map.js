import React, {useState} from 'react'
import ReactMapGL from 'react-map-gl'

export default function Map(){
  const [viewport,setViewport] = useState({
    latitude: 54.35 ,
    longitude:18.6667,
    width:'100vw',
    height:'100vh',
    zoom:8

  })
  return(
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      
      >
        markery
      </ReactMapGL>
    </div>
  )
}