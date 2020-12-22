let fetchRoute = async (from, to) =>
  await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  )
    .then((response) => response.json())
    .then((data) => data.routes[0].geometry.coordinates);
export default fetchRoute;
