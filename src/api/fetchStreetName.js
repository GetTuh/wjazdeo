let fetchStreetName = async (lat, long) =>
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return `${data.features[0].text} ${
        data.features[0].address ? data.features[0].address : ""
      }, ${data.features[1].text} ${data.features[2].text}`;
    });
export default fetchStreetName;
