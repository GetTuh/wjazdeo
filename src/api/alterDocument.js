import { client, q } from "../configs/db";

const alterDocument = (data) =>
  client
    .query(
      q.Update(q.Ref(q.Collection("dojazdy"), data.ref), {
        data: { hour: data.hour, places: data.places },
      })
    )
    .then((ret) => ret)
    .catch((err) => console.warn(err));

export default alterDocument;
