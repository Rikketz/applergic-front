import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit(emergencyContact)}>
      <input
        type="text"
        {...register("Nombre completo de tu contacto", {
          required: "El nombre no puede estar vacío",
        })}
      />

      <input
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
          {errors.email.type === "required" && <p>{errors.email.message}</p>}
          {errors.email.type === "pattern" && <p>{errors.email.message}</p>}
        </>
      )}

      <input
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
        type="text"
        {...register("Compañía de Seguros/Nº Póliza", {
          required: "El móvil no puede estar vacío"
        })}
      />

      <button>Guardar emergencias</button>
    </form>
  );
};

export default RegisterEmergencyContact;
