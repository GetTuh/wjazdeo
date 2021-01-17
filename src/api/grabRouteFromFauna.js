import { client, q } from "../configs/db";

const getAll = client
  .query(q.Paginate(q.Ref(q.Collection("dojazdy"), "285547072400130561")))
  .then((response) => {
    const mapRefs = response.data;
    // create new query out of notes refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProductDataQuery = mapRefs.map((ref) => {
      return q.Get(ref);
    });
    // query the refs
    return client.query(getAllProductDataQuery).then((data) => data);
  })
  .catch((error) => console.warn("error", error.message));

export default getAll;
