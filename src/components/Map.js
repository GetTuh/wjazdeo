import React, {useState} from 'react'
import ReactMapGL, {Marker, CanvasOverlay } from 'react-map-gl'
import PolylineOverlay from './PolylineOverlay'

async function returnRoute(pointFrom,pointTo) {
  let line=null;
  line = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pointFrom.lngLat[0]},${pointFrom.lngLat[1]};${pointTo.lngLat[0]},${pointTo.lngLat[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
          .then(response => response.json())
          .then(data => {
            return data.routes[0].geometry.coordinates
          })
  await console.log(line)
  return await line
}



export default function Map(){
  const [viewport,setViewport] = useState({
    latitude: 54.35 ,
    longitude:18.6667,
    width:'100vw',
    height:'100vh',
    zoom:10

  })
  const [clickedPointFrom,setClickedPointFrom] =useState(null);
  const [clickedPointTo,setClickedPointTo] =useState(null);
  return(
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onClick={clickedPoint=>{
        !clickedPointFrom?(setClickedPointFrom(clickedPoint)):setClickedPointTo(clickedPoint);console.log(clickedPoint.lngLat)}}
   
      >

        {clickedPointFrom?(
          <Marker key= "from"
          latitude={clickedPointFrom.lngLat[1]}
          longitude={clickedPointFrom.lngLat[0]}>
          <div>
            Klik 
          </div>
        </Marker>
        
        ):null}
        {clickedPointTo?(
          <Marker key= "elo"
          latitude={clickedPointTo.lngLat[1]}
          longitude={clickedPointTo.lngLat[0]}>
          <div>
            elo  {()=> {
              return returnRoute(clickedPointFrom,clickedPointTo)}}
          </div>
          
        </Marker>):null}
        {clickedPointFrom&&clickedPointTo&&(
          
          <PolylineOverlay 
          from={clickedPointFrom.lngLat}
          to={clickedPointTo.lngLat}
          points={null} 

          >
          
          </PolylineOverlay>
        )}
      </ReactMapGL>
    </div>
  )
}

