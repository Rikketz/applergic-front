import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import arrow from "../../assets/left-arrow.png";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import camera from "../../assets/camera.png";
import home from "../../assets/home.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const registro = async (data) => {
    const formData = new FormData();
    formData.append("file", data.foto[0]);
    formData.append("Nombre completo", data["Nombre completo"]);
    formData.append("Dirección email", data["Dirección email"]);
    formData.append("Móvil", data["Móvil"]);
    formData.append("password", data.password);

    try {
      const result = await axios.post(
        "http://localhost:5053/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.error("Hubo un error durante el registro:", error);
    }
  };

  return (
    <div>
      <div className="mini-header">
        <div className="volver-div">
          <div className="volver-div__content">
            <img className="left-arrow" src={arrow} alt="arrow icon" />
            <p>Volver</p>
          </div>
          <img className="homen-icon" src={home} alt="home icon" />
        </div>

        <p>1 de 4</p>
      </div>

      <h2>Dinos quién eres</h2>
      <div className="camera-div">
        <div className="upload-image">
          <img className="camera-icon" src={camera} alt="camera" />
          <label htmlFor="uploadImage">Subir foto</label>
          <input
            id="uploadImage"
            type="file"
            style={{ display: "none" }}
            {...register("foto")}
          />
          {errors.foto && <p>{errors.foto.message}</p>}
        </div>
      </div>
      <div className="info-block">
        <form onSubmit={handleSubmit(registro)}>
          <div className="inputs">
            <input
              placeholder="Nombre completo"
              type="text"
              {...register("Nombre completo", {
                required: "El nombre no puede estar vacío",
              })}
            />

            <input
              placeholder="Dirección email"
              type="text"
              {...register("Dirección email", {
                required: "El email no puede estar vacío",
                pattern: {
                  message: "El email no tiene formato correcto",
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
              })}
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
              placeholder="Móvil"
              type="tel"
              {...register("Móvil", {
                required: "El móvil no puede estar vacío",
                pattern: {
                  message: "El móvil no tiene formato correcto",
                  value: /^[0-9\b]+$/,
                },
              })}
            />

            <input
              placeholder="Password"
              type="text"
              {...register("password", {
                required: "La contraseña no puede ser vacía",
                pattern: {
                  message:
                    "La contraseña tiene que tener mayúscula, minúscula, número y símbolo entre 8 y 12 caracteres",
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
            <ButtonGeneral
              className="button"
              text={"Guardar perfil"}
            ></ButtonGeneral>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
