import React from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { useForm } from "react-hook-form";
import checkUser from "../../api/checkUser";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const returnedError = await checkUser(data);
    if (!returnedError) {
      sessionStorage.setItem("res", 1);
      gotoLoggedIn();
    } else {
      alert(returnedError);
    }
  };

  const history = useHistory();

  function gotoLoggedIn() {
    history.push("/loggedIn");
  }

  return (
    <div className="container ">
      <h1 className="text-color-secondary m-16 reveal-from-left">
        Zaloguj się do <Link to="/">Wjazdeo</Link>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="reveal-from-left"
        data-reveal-delay="400"
      >
        <div>
          <h6 className="text-color-secondary container-small">
            Email
            <input
              wide
              wideMobile
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
        </div>
        <Button className="mt-16" wideMobile type="submit">
          Zaloguj się
        </Button>
      </form>
      <div className="reveal-from-left mt-16" data-reveal-delay="800">
        Nie masz konta?{" "}
        <Link to="/register">
          {" "}
          <u>Zarejestruj się</u>
        </Link>
      </div>
    </div>
  );
};
export default Login;
