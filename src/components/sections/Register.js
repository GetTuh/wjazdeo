import React from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

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
              name="login"
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
        <Button className="mt-16" type="submit" disabled>
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
