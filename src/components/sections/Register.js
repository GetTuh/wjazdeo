import React from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import addUser from "../../api/addUser";
const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  function gotoLogin() {
    history.push("/login");
  }

  const onSubmit = (data) => {
    addUser(data);
    alert("Użytkownik utworzony!");
    gotoLogin();
  };

  return (
    <div className="container ">
      <h1 className="text-color-secondary m-16 reveal-from-left">
        <b>Witamy!</b> Zarejestruj się do <Link to="/">Wjazdeo</Link>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="reveal-from-left"
        data-reveal-delay="400"
      >
        <div>
          <h6 className="text-color-secondary container-small">
            Imię i nazwisko
            <input
              type="text"
              name="name"
              className="center-content ml-16 ta-r m-0 has-shadow"
              ref={register}
            />
          </h6>
          <h6 className="text-color-secondary container-small">
            Email
            <input
              type="email"
              name="email"
              className="center-content ml-16 ta-r m-0 has-shadow"
              ref={register}
            />
          </h6>
          <h6 className="text-color-secondary">
            Hasło
            <input
              type="password"
              name="pass"
              className="center-content  ml-16 ta-r has-shadow"
              ref={register({ required: true })}
            />
          </h6>
          {errors.pass && (
            <span className="text-color-error">Hasło jest wymagane</span>
          )}
          <h6 className="text-color-secondary">
            Numer telefonu
            <input
              type="tel"
              name="tel"
              className="center-content  ml-16 ta-r has-shadow"
              ref={register({ required: true })}
            />
          </h6>
          {errors.pass && (
            <span className="text-color-error">
              Numer telefonu jest wymagany!
            </span>
          )}
        </div>
        <Button className="mt-16" type="submit" Link to={"/login"}>
          Zarejestruj się!
        </Button>
      </form>
      <div className="reveal-from-left mt-16" data-reveal-delay="800">
        Masz już konto?{" "}
        <Link to="/login">
          {" "}
          <u>Zaloguj się</u>
        </Link>
      </div>
    </div>
  );
};
export default Register;
