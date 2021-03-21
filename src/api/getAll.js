import { client, q } from "../configs/db";

const getAll = client
  .query(q.Paginate(q.Match(q.Ref("indexes/trips"))))
  .then((response) => {
    const mapRefs = response.data;
    const getAllProductDataQuery = mapRefs.map((ref) => {
      return q.Get(ref);
    });
    return client.query(getAllProductDataQuery).then((data) => data);
  })
  .catch((error) => console.warn("error", error.message));

export default getAll;
