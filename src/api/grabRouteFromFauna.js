import { client, q } from "../configs/db";

const getRoute = client
  .query(q.Paginate(q.Ref(q.Collection("dojazdy"), "285547072400130561")))
  .then((response) => {
    const mapRefs = response.data;
    const getAllProductDataQuery = mapRefs.map((ref) => {
      return q.Get(ref);
    });
    return client.query(getAllProductDataQuery).then((data) => data);
  })
  .catch((error) => console.warn("error", error.message));

export default getRoute;
