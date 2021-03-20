import React, { useState } from "react";
import ReactMapGL, { Marker, Layer, Popup } from "react-map-gl";

import PolylineOverlay from "./PolylineOverlay";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "../elements/Button";

import {
  addRoute,
  getAll,
  grabRouteFromFauna,
  fetchRoute,
  checkIfRouteAlreadyAdded,
} from "../../api/apiExport";

const testData = {
  user_ID: "elo",
  hour: "8:00",
  points: [
    [18.641721, 54.362294],
    [18.636793, 54.36521],
    [18.636421, 54.365004],
    [18.64094, 54.362308],
    [18.645557, 54.358152],
    [18.645024, 54.353804],
    [18.646036, 54.351703],
    [18.645657, 54.349851],
    [18.644856, 54.348422],
    [18.645243, 54.347744],
    [18.649826, 54.346907],
    [18.656842, 54.34535],
    [18.663671, 54.344383],
    [18.668027, 54.345447],
    [18.66885, 54.346202],
    [18.669802, 54.348137],
    [18.670811, 54.348664],
    [18.674571, 54.349118],
    [18.683191, 54.348959],
    [18.682717, 54.348055],
    [18.6798, 54.345741],
    [18.685721, 54.340653],
    [18.680931, 54.338551],
  ],
};

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
  const zs = checkIfRouteAlreadyAdded;
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
            // console.log(checkIfRouteAlreadyAdded(testData));
            setClickedPointFrom(clickedPoint);
            console.log(clickedPoint.lngLat);
          } else {
            if (!clickedPointTo) {
              setClickedPointTo(clickedPoint);
              console.log(clickedPoint.lngLat);
              // addRoute("elo");
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
        {/* <center className="text-center text-color-primary insert-table">
          <b>Twoja trasa z </b>
          <b className="text-color-secondary"> Kolejowa 5, 80-201 Gdańsk </b>
          <b>Do:</b>
          <b className="text-color-secondary"> Niwki 30, 80-731 Gdańsk </b>
          <b>Podaj godzinę:</b>
          <input type="time" value="07:00" className="timeinput"></input>
          <Button className="text-color-success m-12">Zatwierdź trasę!</Button>
          <Button className="text-color-error m-12">Powrót do wjazdeo</Button>
        </center> */}
      </ReactMapGL>{" "}
      {/* get name of street from cords `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}` */}
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
