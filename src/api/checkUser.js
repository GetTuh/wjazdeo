import { client, q } from "../configs/db";

const checkUser = (login) =>
  client
    .query(q.Paginate(q.Match(q.Ref("indexes/login"))))
    .then((response) => {
      const mapRefs = response.data;
      const getAllProductDataQuery = mapRefs.map((ref) => {
        return q.Get(ref);
      });
      return client.query(getAllProductDataQuery).then((data) => {
        for (const element of data) {
          if (element.data.email == login.email) {
            if (element.data.pass == login.pass) {
              console.log(`${element.data.pass} , ${login.pass}`);
              sessionStorage.clear();
              sessionStorage.setItem("name", element.data.name);
              sessionStorage.setItem("email", element.data.email);
              sessionStorage.setItem("tel", element.data.tel);
            } else {
              return "Złe hasło!";
            }
          }
        }
        if (!sessionStorage.getItem("name")) {
          return "Zły email!";
        }
      });
    })
    .catch((error) => {
      console.log(client);
      console.warn("error", error.message);
    });

export default checkUser;
