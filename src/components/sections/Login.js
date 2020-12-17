import React from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import verifyEmail from "../../scripts/verifyEmail";
const emailChanged = (value) => {
  console.log(verifyEmail(value));
};
const Login = () => {
  return (
    <div className="container ">
      <h1 className="text-color-secondary m-16 reveal-from-left">
        Zaloguj się do <Link to="/">Wjazdeo</Link>
      </h1>
      <div className="reveal-from-left" data-reveal-delay="400">
        <div>
          <h6 className="text-color-secondary">
            Email:
            <input
              type="email"
              name="login"
              className="center-content ml-16 ta-r m-0"
              onChange={console.log(this)}
            />
          </h6>
          <h6 className="text-color-secondary">
            Hasło:
            <input
              type="password"
              name="login"
              className="center-content  ml-16 ta-r"
            />
          </h6>
        </div>
        <Button className="mt-16" onClick={null}>
          Zaloguj się
        </Button>
      </div>
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
