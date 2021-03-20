let fetchStreetName = async (lat, long) =>
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  )
    .then((response) => response.json())
    .then((data) => data.routes[0].geometry.coordinates);
export default fetchStreetName;
