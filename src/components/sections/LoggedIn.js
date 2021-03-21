import React from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { useForm } from "react-hook-form";
import checkUser from "../../api/checkUser";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    checkUser(data);
  };
  const history = useHistory();

  function gotoMain() {
    history.push("/");
  }
  const logout = () => {
    sessionStorage.clear();
    alert("wylogowano!");
    gotoMain();
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
      <table>
        <tr>
          <td>Od</td>
          <td>Do</td>
          <td>Godzina</td>
          <td>Liczba miejsc</td>
          <td>Edytuj</td>
        </tr>
        <tr>
          <td>Ludwika Waryńskiego 30/31, 80-433 Gdańsk</td>
          <td>Tama Pędzichowska 19, 83-021 Przejazdowo</td>
          <td>7:00</td>
          <td>3</td>
          <td>
            <Button>Edytuj</Button>
          </td>
        </tr>
        <tr>
          <td>Tama Pędzichowska 19, 83-021 Przejazdowo</td>
          <td>Ludwika Waryńskiego 30/31, 80-433 Gdańsk</td>
          <td>15:00</td>
          <td>3</td>
          <td>
            <Button>Edytuj</Button>
          </td>
        </tr>
      </table>
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
