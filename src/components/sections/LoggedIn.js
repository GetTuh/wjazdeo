import React, { useState } from "react";
import { generatePath, Link } from "react-router-dom";
import Button from "../elements/Button";
import checkUser from "../../api/checkUser";
import { useHistory } from "react-router-dom";
import { getAll, deleteDocument, alterDocument } from "../../api/apiExport";
const Login = () => {
  const [routes, setRoutes] = useState(null);
  const [editing, setEditing] = useState(false);
  const [hour, setHour] = useState(null);
  const [places, setPlaces] = useState(null);

  const history = useHistory();

  function gotoMain() {
    history.push("/");
  }
  const logout = () => {
    sessionStorage.clear();
    alert("Wylogowano!");
    gotoMain();
  };
  let fetchRoutes = async () => {
    let a = await getAll;
    setRoutes(a);
  };
  fetchRoutes();
  const editButton = (item) => {
    setEditing(item.target.id);
  };
  const cancelButton = () => {
    setEditing(false);
  };
  const deleteButton = () => {
    const ref = editing.replace(/[^0-9]/g, "");
    deleteDocument(ref);
    window.location.reload();
  };
  const sendEdits = () => {
    const ref = editing.replace(/[^0-9]/g, "");
    let data = {};
    if (hour && places) {
      data = { ref: ref, hour: hour, places: places };
    } else if (hour) {
      data = { ref: ref, hour: hour };
    } else data = { ref: ref, places: places };
    alterDocument(data);
    window.location.reload();
  };
  const readPlaces = (item) => {
    setPlaces(item.target.value);
  };
  return (
    <div className="container">
      <h3
        data-reveal-delay="200"
        className="text-color-secondary mt-32 reveal-from-bottom"
      >
        Witamy! Jesteś zalogowany jako{" "}
        <b className="text-color-primary">{sessionStorage.getItem("name")}</b>
      </h3>
      <h4>Twoje przejazdy:</h4>

      {routes && (
        <table reveal-delay="200" reveal-from-left>
          {" "}
          <tr>
            <td>Od</td>
            <td>Do</td>
            <td>Godzina</td>
            <td>Liczba miejsc</td>
            <td>Edytuj</td>
          </tr>
          {routes.map((item) => {
            if (item.data.user_ID === sessionStorage.getItem("email")) {
              return (
                <tr>
                  <td>{item.data.street_names[0]}</td>
                  <td>{item.data.street_names[1]}</td>
                  {editing != item.ref && <td>{item.data.hour}</td>}
                  {editing == item.ref && (
                    <td>
                      <input
                        type="time"
                        className="timeinput"
                        onChange={(event) => setHour(event.target.value)}
                      ></input>
                    </td>
                  )}
                  {editing != item.ref && <td>{item.data.places}</td>}
                  {editing == item.ref && (
                    <td className="timeinput">
                      <select id="selectNumber" onChange={readPlaces}>
                        <option value="-">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                    </td>
                  )}
                  {editing != item.ref && (
                    <td>
                      <Button id={item.ref} onClick={editButton}>
                        Edytuj
                      </Button>
                    </td>
                  )}
                  {editing == item.ref && (
                    <td className="few-buttons">
                      <Button
                        className="few-buttons mb-8"
                        id={item.ref}
                        onClick={deleteButton}
                      >
                        Usuń
                      </Button>
                      <Button
                        className="few-buttons mb-8"
                        id={item.ref}
                        onClick={sendEdits}
                      >
                        Zmień
                      </Button>
                      <Button
                        className="few-buttons"
                        id={item.ref}
                        onClick={cancelButton}
                      >
                        Anuluj
                      </Button>
                    </td>
                  )}
                </tr>
              );
            }
          })}
        </table>
      )}

      <Link to="/mapAdd">
        <Button className="m-24">Dodaj trasę</Button>
      </Link>
      <Button className="m-24">Wyszukaj dojazdu dla Ciebie!</Button>
      <Button className="m-24" onClick={logout}>
        Wyloguj
      </Button>
    </div>
  );
};
export default Login;
