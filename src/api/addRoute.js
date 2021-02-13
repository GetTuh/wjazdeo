import { client, q } from "../configs/db";

const createNote = (data) =>
  client
    .query(
      q.Create(q.Collection("dojazdy"), {
        data: { data },
      })
    )
    .then((ret) => ret)
    .catch((err) => console.warn(err));

export default createNote;
