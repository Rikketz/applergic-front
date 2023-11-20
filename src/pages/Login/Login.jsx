import React, { useContext } from "react";
import { useForm } from "react-hook-form";
// import { API } from "../../shared/services/api";
import { Link, useNavigate } from "react-router-dom";
import { Contexto } from "../../App";
import headerImage from "../../assets/img-header-login.png";
import "./Login.scss";
import logo from "../../assets/logo.png";
import ButtonGeneral from '../../Components/buttonGeneral/buttonGeneral';
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setToken } = useContext(Contexto);

  const log = async (data) => {
    const result = await axios.post("http://localhost:5053/user/login", data);
    console.log(result);
    setToken(result.data.token);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    navigate("/");
  };
  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt="applergic-logo" />
        <img className="header-img" src={headerImage} alt="allergic products" />
      </div>

      <div className="info-block">
        <h2>¡Bienvenido de nuevo!</h2>
        <p className="data-text">Por favor, introduce tus datos para continuar.</p>
        <form onSubmit={handleSubmit(log)}>
        <div className="inputs">
          <input placeholder="Dirección email"
            type="text"
            {...register("email", {
              required: "El email no puede estar vacio",
              pattern: {
                message: "el email no tiene formato correcto",
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            })}
          />
          {errors.email && (
            <>
              {errors.email.type === "required" && (
                <p>{errors.email.message}</p>
              )}
              {errors.email.type === "pattern" && <p>{errors.email.message}</p>}
            </>
          )}
          <input placeholder="Password"
            type="password"
            {...register("password", {
              required: "La contraseña no puede ser vacia",
              pattern: {
                message:
                  "el password tiene que tener mayuscuala minuscula numero y simbolo y entre 8 y 12 caracteres",
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
              },
            })}
          />
          {errors.password && (
            <>
              {errors.password.type === "required" && (
                <p>{errors.password.message}</p>
              )}
              {errors.password.type === "pattern" && (
                <p>{errors.password.message}</p>
              )}
            </>
          )}
          </div>
          <p className="pass-text">¿Olvidaste tu contraseña?</p>
<ButtonGeneral text={"Entrar"}></ButtonGeneral>
        </form>

        <p className="p-style">¿Nuevo en Applergic?</p>
        <Link to={'/register'}><h3 className="h3-style">Crea tu cuenta aquí</h3></Link>
        <h4 className="h4-style">Me registraré en otro momento</h4>
      </div>
    </div>
  );
};

export default Login;
