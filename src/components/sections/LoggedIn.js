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
      <Button className="mr-0" onClick={logout}>
        Wyloguj
      </Button>
    </div>
  );
};
export default Login;
