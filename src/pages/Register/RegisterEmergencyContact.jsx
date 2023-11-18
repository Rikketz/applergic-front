import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/left-arrow.png";
import home from "../../assets/home.png";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import "./RegisterEmergencyContact.scss";

const RegisterEmergencyContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const emergencyContact = async (data) => {
    const formData = new FormData();
    formData.append(
      "Nombre completo de tu contacto",
      data["Nombre completo de tu contacto"]
    );
    formData.append("Dirección email", data["Dirección email"]);
    formData.append("Móvil", data["Móvil"]);
    formData.append(
      "Compañía de Seguros/Nº Póliza",
      data["Compañía de Seguros/Nº Póliza"]
    );

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
      console.error(
        "Hubo un error durante el registro del contacto de emergencia:",
        error
      );
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

        <p>2 de 4</p>
      </div>
      <div className="top-text">
      <div className="top-text__info">
        <h2>Vamos a añadir tu contacto en caso de emergencia.</h2>
        <p>
          Nos pondremos en contacto con tu persona de confianza y/o compañía de
          seguros en caso de emergencia.
        </p>
      </div>
      </div>

      <div className="info-block">
        <form onSubmit={handleSubmit(emergencyContact)}>
          <div className="inputs">
            <input className="first-input"
              placeholder="Nombre completo de tu contacto"
              type="text"
              {...register("Nombre completo de tu contacto", {
                required: "El nombre no puede estar vacío",
              })}
            />

            <input className="all-inputs"
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

            <input className="all-inputs"
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

            <input className="all-inputs"
              placeholder="Compañía de Seguros/Nº Póliza"
              type="text"
              {...register("Compañía de Seguros/Nº Póliza", {
                required: "El móvil no puede estar vacío",
              })}
            />

            <ButtonGeneral text={"Guardar emergencias"}></ButtonGeneral>
          </div>
        </form>
      </div>
      <p className="p-style">Registraré mi contacto en otro momento</p>
    </div>
  );
};

export default RegisterEmergencyContact;
