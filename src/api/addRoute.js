import { client, q } from "../configs/db";

const createNote = (text) =>
  client
    .query(
      q.Create(q.Collection("wszystkie_dojazdy"), {
        data: {
          text,
        },
      })
    )
    .then((ret) => ret)
    .catch((err) => console.warn(err));

export default createNote;
