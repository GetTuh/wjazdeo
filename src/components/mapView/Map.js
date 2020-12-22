import React, { useState } from "react";
import ReactMapGL, { Marker, Layer, Popup } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";
import "mapbox-gl/dist/mapbox-gl.css";
import addRoute from "../../api/addRoute";
import getAll from "../../api/getAll";
import fetchRoute from "../../api/fetchRoute";

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
          } else {
            if (!clickedPointTo) {
              setClickedPointTo(clickedPoint);
              addRoute("elo");
            }
          }
        }}
      >
        {clickedPointFrom ? (
          <Popup
            key="from"
            latitude={clickedPointFrom.lngLat[1]}
            longitude={clickedPointFrom.lngLat[0]}
          >
            <b className="text-color-primary"> Od</b>
          </Popup>
        ) : null}
        {clickedPointTo ? (
          <Marker
            key="to"
            latitude={clickedPointTo.lngLat[1]}
            longitude={clickedPointTo.lngLat[0]}
          >
            <div className="text-color-primary">Do</div>
          </Marker>
        ) : null}
        {viewportChanged && clickedPointFrom && clickedPointTo && (
          <div>
            <PolylineOverlay
              points={fetchPoints(
                clickedPointFrom.lngLat,
                clickedPointTo.lngLat
              )}
            ></PolylineOverlay>
          </div>
        )}
      </ReactMapGL>{" "}
      {/* get name of street from cords `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}` */}
      {/* <Button onClick={}>Prześlij dane</Button> */}
    </div>
  );
}
