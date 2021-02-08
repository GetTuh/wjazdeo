import { client, q } from "../configs/db";

const getAll = (login) =>
  client
    .query(q.Paginate(q.Match(q.Ref("indexes/login"))))
    .then((response) => {
      const mapRefs = response.data;
      // create new query out of notes refs.
      // https://docs.fauna.com/fauna/current/api/fql/
      const getAllProductDataQuery = mapRefs.map((ref) => {
        return q.Get(ref);
      });
      // query the refs
      return client.query(getAllProductDataQuery).then((data) => {
        for (const element of data) {
          if (element.data.email == login.email) {
            if (element.data.pass == login.pass) {
              sessionStorage.clear();
              sessionStorage.setItem("name", element.data.name);
              sessionStorage.setItem("email", element.data.email);
            } else {
              alert(`Podane hasło jest nieprawidłowe!`);
            }
          }
        }
      });
    })
    .catch((error) => console.warn("error", error.message));

export default getAll;
