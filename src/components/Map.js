import React, { useState } from "react";
import ReactMapGL, { Marker, CanvasOverlay } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 54.35,
    longitude: 18.6667,
    width: "100vw",
    height: "100vh",
    zoom: 10,
    transitionDuration: 1000,
  });
  const [clickedPointFrom, setClickedPointFrom] = useState(null);
  const [clickedPointTo, setClickedPointTo] = useState(null);
  let viewportChanged = false;
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={
          ((viewportChanged = true),
          (nextViewport) => setViewport(nextViewport))
        }
        onClick={(clickedPoint) => {
          !clickedPointFrom
            ? setClickedPointFrom(clickedPoint)
            : setClickedPointTo(clickedPoint);
          console.log(clickedPoint.lngLat);
        }}
      >
        {clickedPointFrom ? (
          <Marker
            key="from"
            latitude={clickedPointFrom.lngLat[1]}
            longitude={clickedPointFrom.lngLat[0]}
          >
            <div>Od</div>
          </Marker>
        ) : null}
        {clickedPointTo ? (
          <Marker
            key="to"
            latitude={clickedPointTo.lngLat[1]}
            longitude={clickedPointTo.lngLat[0]}
          >
            <div>Do</div>
          </Marker>
        ) : null}
        {viewportChanged && clickedPointFrom && clickedPointTo && (
          <PolylineOverlay
            from={clickedPointFrom.lngLat}
            to={clickedPointTo.lngLat}
          ></PolylineOverlay>
        )}
        <button>elo</button>
      </ReactMapGL>{" "}
      {/* get name of street from cords `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}` */}
    </div>
  );
}
