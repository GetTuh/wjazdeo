import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container ">
      <h1 className="text-color-secondary m-16 reveal-from-bottom">
        Zaloguj się do <Link to="/">Wjazdeo</Link>
      </h1>
      <div className="reveal-from-bottom" data-reveal-delay="500">
        Tutaj idzie login
      </div>
      <div className="reveal-from-bottom" data-reveal-delay="800">
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
