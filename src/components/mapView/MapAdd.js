import React, { useState } from "react";
import ReactMapGL, { Marker, Layer, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import PolylineOverlay from "./PolylineOverlay";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "../elements/Button";
import { useHistory } from "react-router-dom";
import { addRoute, fetchRoute, fetchStreetName } from "../../api/apiExport";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 54.35,
    longitude: 18.6667,
    width: "100vw",
    height: "92vh",
    zoom: 10,
    transitionDuration: 1000,
  });
  const [clickedPointFrom, setClickedPointFrom] = useState(null);
  const [clickedPointTo, setClickedPointTo] = useState(null);
  const [streetNameFrom, setstreetNameFrom] = useState(null);
  const [streetNameTo, setstreetNameTo] = useState(null);
  const [hour, setHour] = useState(null);
  const history = useHistory();
  function gotoLoggedIn() {
    alert("Dodano trasę!");
    history.push("/loggedIn");
    window.location.reload();
  }
  let viewportChanged = false;
  let sentPoints = "";
  let fetchPoints = async (from, to) => {
    let response = await fetchRoute(from, to);
    sentPoints = response;
    return response;
  };
  let fetchName = (lat, long) => {
    let asyncFetchName = async (lat, long) => {
      let fetchedName = await fetchStreetName(lat, long);
      setstreetNameFrom(fetchedName);
    };
    asyncFetchName(lat, long);
    return streetNameFrom;
  };
  let fetchNameTo = (lat, long) => {
    let asyncFetchName = async (lat, long) => {
      let fetchedName = await fetchStreetName(lat, long);
      setstreetNameTo(fetchedName);
    };
    asyncFetchName(lat, long);
    return streetNameTo;
  };
  const acceptRoute = () => {
    addRoute({
      user_ID: sessionStorage.getItem("email"),
      points: sentPoints,
      street_names: [streetNameFrom, streetNameTo],
      hour: hour,
      places: 3,
      name: sessionStorage.getItem("name"),
      tel: sessionStorage.getItem("tel"),
    });
    gotoLoggedIn();
  };
  return (
    <div className="map-container">
      <div>
        <center className="text-center text-color-primary map-header">
          <div>
            {!clickedPointFrom && (
              <b className="mt-24">Kliknij aby dodać początek trasy!</b>
            )}
            {clickedPointFrom && !clickedPointTo && (
              <b>
                Twoja trasa zaczyna się od:
                <b className="text-color-secondary">
                  {" "}
                  {fetchName(
                    clickedPointFrom.lngLat[0],
                    clickedPointFrom.lngLat[1]
                  )}{" "}
                </b>
                <br></br>
                Kliknij aby wybrać koniec trasy!
              </b>
            )}
            {clickedPointFrom && clickedPointTo && (
              <div>
                Twoja trasa z{" "}
                <b className="text-color-secondary">{streetNameFrom}</b> Do:{" "}
                <b className="text-color-secondary">
                  {fetchNameTo(
                    clickedPointTo.lngLat[0],
                    clickedPointTo.lngLat[1]
                  )}
                </b>
                &nbsp;Podaj godzinę:
                <input
                  type="time"
                  className="timeinput"
                  onChange={(event) => setHour(event.target.value)}
                ></input>
                <div className="m-12">
                  <Button
                    className="text-color-success m-4"
                    onClick={acceptRoute}
                  >
                    Zatwierdź trasę!
                  </Button>
                  <Link to="/loggedIn">
                    <Button className="text-color-error m-4">
                      Powrót do wjazdeo
                    </Button>
                  </Link>
                </div>
              </div>
            )}{" "}
            {(!clickedPointFrom || !clickedPointTo) && (
              <Link to="/loggedIn">
                <Button className="text-color-error m-4">
                  Powrót do wjazdeo
                </Button>
              </Link>
            )}
          </div>
        </center>
      </div>
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
    </div>
  );
}
