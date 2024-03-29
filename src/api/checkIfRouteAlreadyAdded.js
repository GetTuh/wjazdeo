import { client, q } from "../configs/db";

const getAllNotes = (data) =>
  client
    .query(q.Paginate(q.Match(q.Ref("indexes/trips"))))
    .then((response) => {
      const notesRefs = response.data;
      // create new query out of notes refs.
      // https://docs.fauna.com/fauna/current/api/fql/
      const getAllProductDataQuery = notesRefs.map((ref) => {
        return q.Get(ref);
      });
      // query the refs
      return client.query(getAllProductDataQuery).then((data) => data);
    })
    .catch((error) => console.warn("error", error.message));

export default getAllNotes;
