import { client, q } from "../configs/db";

const deleteDocument = (data) =>
  client
    .query(q.Delete(q.Ref(q.Collection("dojazdy"), data)))
    .then((ret) => ret)
    .catch((err) => console.warn(err));

export default deleteDocument;
