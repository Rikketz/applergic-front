import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Contexto } from "../../App";
import headerImage from "../../assets/img-header-login.png";
import "./Login.scss";
import logo from "../../assets/logo.png";
import GreyButton from "../../Components/buttonGeneral/greyButton";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import axios from "axios";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setToken } = useContext(Contexto);
  const [isHomeVisible, setIsHomeVisible] = useState(false);

  const handleInputCompleted = () => {
    const inputs = document.querySelectorAll(
      'input[type="email"], input[type="password"]'
    );

    const allInputsHaveData = Array.from(inputs).every(
      (input) => input.value.trim().length > 0
    );

    setIsHomeVisible(allInputsHaveData);
  };

  const log = async (data) => {
    try {
      const result = await axios.post("http://localhost:5053/user/login", data);

      if (result && result.status === 200 && result.data.token) {
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userInfo?._id);
        navigate("/main");
      } else {
        setErrorMessage("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setErrorMessage("Error al iniciar sesión");
    }
  };
  
  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt="applergic-logo" />
        <img className="header-img" src={headerImage} alt="allergic products" />
      </div>

      <div className="info-block">
        <h2>¡Bienvenido de nuevo!</h2>
        <p className="data-text">
          Por favor, introduce tus datos para continuar.
        </p>
        <form onSubmit={handleSubmit(log)}>
          <div className="inputs">
            <input
              placeholder="Dirección email"
              type="email"
              {...register("email", {
                required: "El email no puede estar vacio",
                pattern: {
                  message: "El email no tiene formato correcto",
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
              })}
              onChange={handleInputCompleted}
            />
            {errors.email && (
              <>
                {errors.email.type === "required" && (
                  <p>{errors.email.message}</p>
                )}
                {errors.email.type === "pattern" && (
                  <p>{errors.email.message}</p>
                )}
              </>
            )}
            <input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "La contraseña no puede ser vacia",
                pattern: {
                  message:
                    "La contraseña tiene que tener al menos una mayúscula, una minúscula, un símbolo y entre 8 y 12 caracteres",
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                },
              })}
              onChange={handleInputCompleted}
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

          {isHomeVisible ? (
            <ButtonGeneral text={"Entrar"}></ButtonGeneral>
          ) : (
            <GreyButton text={"Entrar"}></GreyButton>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

        <div className="footer-info">
          <p className="p-style">¿Nuevo en Applergic?</p>
          <Link to={"/register"}>
            <h3 className="h3-style">Crea tu cuenta aquí</h3>
          </Link>
          <Link to={"/main"}>
            <h4 className="skip">Me registraré en otro momento</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
