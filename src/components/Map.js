import React, {useState} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'

export default function Map(){
  const [viewport,setViewport] = useState({
    latitude: 54.35 ,
    longitude:18.6667,
    width:'100vw',
    height:'100vh',
    zoom:10

  })
  const [clickedPoint,setClickedPoint] =useState(null);
  return(
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onClick={clickedPoint=>{
        setClickedPoint(clickedPoint)
      }}
      
      >
        {clickedPoint?(
          <Marker key= {Math.random()*1000}
          latitude={clickedPoint.lngLat[1]}
          longitude={clickedPoint.lngLat[0]}>
          <div>
            Klik 
          </div>
        </Marker>
        ):null}
        
      </ReactMapGL>
    </div>
  )
}