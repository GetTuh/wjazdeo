import React, { useState } from "react";
import ReactMapGL, { Marker, Layer, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import PolylineOverlay from "./PolylineOverlayBlue";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "../elements/Button";
import { useHistory } from "react-router-dom";
import { getAll, fetchRoute, fetchStreetName } from "../../api/apiExport";
import { get } from "lodash";

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
  const lookForRoute = async () => {
    await fetchPoints(clickedPointFrom.lngLat, clickedPointTo.lngLat)
      .then((response) => response)
      .then(async (data) => {
        let routes = await getAll;

        console.log(routes);
        console.log(data);
        let routeRating = [];
        routes.forEach((item) => {
          let ref = item.ref;
          ref = ref.toString().replace(/[^0-9]/g, "");
          let routeItem = item.data.points.map((z) =>
            z.map((x) => Math.round(x * 1000 + Number.EPSILON) / 1000)
          );
          // console.log(`data from fauna ${routeItem}`);
          data = data.map((z) =>
            z.map((x) => Math.round(x * 1000 + Number.EPSILON) / 1000)
          );
          // console.log(`current route: ${data}`);
          let intersections = routeItem.concat(data);
          let rating = 0;
          const counts = intersections.reduce(
            (acc, value) => ({
              ...acc,
              [value]: (acc[value] || 0) + 1,
            }),
            {}
          );

          for (const [, value] of Object.entries(counts)) {
            if (value == 2) {
              rating++;
            }
          }
          console.log(`${ref} rating: ${rating}`);
          if (rating > 3) routeRating = routeRating.concat([[ref, rating]]);
        });
        console.log(routeRating);
        const routeRatingSorted = routeRating.sort((a, b) => a[1] - b[1]);
        console.log(routeRatingSorted);
      });
  };
  return (
    <div className="map-container">
      <div>
        <center className="text-center text-color-primary map-header">
          <div>
            {!clickedPointFrom && (
              <b className="mt-24">Wybierz skąd chcesz wyruszyć!</b>
            )}
            {clickedPointFrom && !clickedPointTo && (
              <b>
                Chcesz wyruszyć z:
                <b className="text-color-secondary">
                  {" "}
                  {fetchName(
                    clickedPointFrom.lngLat[0],
                    clickedPointFrom.lngLat[1]
                  )}{" "}
                </b>
                <br></br>
                Wybierz gdzie chcesz dojechać!
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
                <div className="m-12">
                  <Button
                    className="text-color-success m-4"
                    onClick={lookForRoute}
                  >
                    Wyszukaj trasę!
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
            {/* <PolylineOverlay
              points={fetchPoints(
                clickedPointFrom.lngLat,
                clickedPointTo.lngLat
              )}
            ></PolylineOverlay> */}
            trasa elo
          </div>
        )}
      </ReactMapGL>{" "}
    </div>
  );
}
