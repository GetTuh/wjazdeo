import faunadb from "faunadb";
let client = 0;
if (global.REACT_APP_FAUNADB_KEY) {
  client = new faunadb.Client({
    secret: global.REACT_APP_FAUNADB_KEY,
  });
} else {
  client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_KEY,
  });
}
const q = faunadb.query;

export { client, q };
