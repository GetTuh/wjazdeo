import React, { useState } from "react";
import ReactMapGL, { Marker, Layer, Popup } from "react-map-gl";

import PolylineOverlay from "./PolylineOverlayBlue";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "../elements/Button";

import {
  addRoute,
  getAll,
  grabRouteFromFauna,
  fetchRoute,
} from "../../api/apiExport";

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
  const r = addRoute;
  const z = getAll;
  let fetchPoints = async (from, to) => await fetchRoute(from, to);
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
          if (!clickedPointFrom) {
            setClickedPointFrom(clickedPoint);
            console.log(clickedPoint.lngLat);
          } else {
            if (!clickedPointTo) {
              setClickedPointTo(clickedPoint);
              console.log(clickedPoint.lngLat);
            }
          }
        }}
      >
        {clickedPointFrom ? (
          <Popup
            key="from"
            latitude={clickedPointFrom.lngLat[1]}
            longitude={clickedPointFrom.lngLat[0]}
            closeButton={false}
          >
            <b className="text-color-primary"> Od</b>
          </Popup>
        ) : null}
        {clickedPointTo ? (
          <Popup
            key="to"
            latitude={clickedPointTo.lngLat[1]}
            longitude={clickedPointTo.lngLat[0]}
            closeButton={false}
          >
            <b className="text-color-primary">Do</b>
          </Popup>
        ) : null}

        {viewportChanged && (
          <div>
            <PolylineOverlay points={grabRouteFromFauna}></PolylineOverlay>
          </div>
        )}
        <center className="text-center text-color-primary insert-table">
          <b>Dopasowany do ciebie kierowca to </b>
          <b className="text-color-secondary"> {"Jeronim Czerwiński"} </b>
          <b>Dojeżdża na pokazanej trasie w godzinach:</b>
          <b className="text-color-secondary"> {"7:00"} </b>
          <b>Numer kontaktowy:</b>
          <b className="text-color-secondary"> {"numewwwwwwwwwwwwr"} </b>
          <Button className="text-color-success m-12">
            Wyszukaj inną trasę!
          </Button>
          <Button className="text-color-error m-12">Powrót do wjazdeo</Button>
        </center>
      </ReactMapGL>
    </div>
  );
}

// klik
// {viewportChanged && clickedPointFrom && clickedPointTo && (
//   <div>
//     <PolylineOverlay
//       points={fetchPoints(
//         clickedPointFrom.lngLat,
//         clickedPointTo.lngLat
//       )}
//     ></PolylineOverlay>
//     {/* points={fetchPoints(
//         clickedPointFrom.lngLat,
//         clickedPointTo.lngLat
//       )} */}
//   </div>
// )}
