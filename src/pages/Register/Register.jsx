import React, { useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import arrow from "../../assets/left-arrow.png";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import camera from "../../assets/camera.png";
import home from "../../assets/home.png";
import passwordIcon from "../../assets/ojoCerrado.png";

const Register = () => {
  const fileInputRef = useRef(null);
  const [selectedAlergenos, setSelectedAlergenos] = useState([]);
  const handleEditClick = () => {
    fileInputRef.current.click();
  };
  const [isHomeVisible, setIsHomeVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordOn = () => {
    setIsPasswordVisible(true);
  };

  const handleInputCompleted = (e) => {
    const inputs = document.querySelectorAll(
      'input[type="text"], input[type="tel"], input[type="password"]'
    );
    const allInputsHaveData = Array.from(inputs).every(
      (input) => input.value.trim().length > 0
    );
    setIsHomeVisible(allInputsHaveData);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const goBack = () => {
    window.history.back();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    setValue("foto[0]", file);
  };

  const registro = async (data) => {
    const formData = new FormData();
    formData.append("foto", data["foto[0]"]);
    formData.append("email", data["Dirección email"]);
    formData.append("password", data.password);
    formData.append("nombreCompleto", data["Nombre completo"]);
    formData.append("direccion", data["Dirección email"]);
    formData.append("telefono", data.Móvil);

    try {

  const result = await axios.post("http://localhost:5053/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  localStorage.setItem("userId", result.data.data._id);
  localStorage.setItem("selectedAlergenos", JSON.stringify(selectedAlergenos));
  console.log(result);
  navigate("/register-emergency-contact", { state: { userId: result.data.data._id } });
  console.log(result.data.data._id);
} catch (error) {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.error("Error de respuesta del servidor:", error.response.data);
  } else if (error.request) {
    // La solicitud fue realizada, pero no se recibió una respuesta del servidor
    console.error("No se recibió respuesta del servidor:", error.request);
  } else {
    // Algo sucedió en la configuración de la solicitud que generó un error
    console.error("Error durante la configuración de la solicitud:", error.message);
  }
}}


  return (
    <div>
      <div className="mini-header">
        <div className="volver-div">
          <div className="volver-div__content">
            <img className="left-arrow" src={arrow} alt="arrow icon" />
            <p className="p-volver" onClick={goBack}>
              Volver
            </p>
          </div>
          {isHomeVisible && (
            <img className="homen-icon" src={home} alt="home icon" />
          )}
        </div>

        <p>1 de 4</p>
      </div>

      <h2>Dinos quién eres</h2>
      <div className="info-block">
        <form onSubmit={handleSubmit(registro)}>
          <div className="camera-div">
            <div className="upload-image">
              {previewImage ? (
                <img
                  className="camera-icon-preview"
                  src={previewImage}
                  alt="preview"
                />
              ) : (
                <label htmlFor="uploadImage" className="camera-icon__label">
                  <img className="camera-icon" src={camera} alt="camera" />
                  Subir foto
                </label>
              )}
              <input
                id="uploadImage"
                type="file"
                style={{ opacity: 0, position: "absolute" }}
                {...register("foto[0]")}
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {errors.foto && <p>{errors.foto.message}</p>}
            </div>
            {previewImage && (
              <p onClick={handleEditClick} className="p-edit">
                Editar foto
              </p>
            )}
            {/* <p className="p-edit">Editar foto</p> */}
          </div>

          <div className="inputs">
            <input
              className="first-input"
              placeholder="Nombre completo"
              type="text"
              {...register("Nombre completo", {
                required: "El nombre no puede estar vacío",
              })}
              onChange={handleInputCompleted}
            />

            <input
              className="all-inputs"
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
              className="all-inputs"
              placeholder="Móvil"
              type="tel"
              {...register("Móvil", {
                required: "El móvil no puede estar vacío",
                pattern: {
                  message: "El móvil no tiene formato correcto",
                  value: /^[0-9\b]+$/,
                },
              })}
              onChange={handleInputCompleted}
            />

            <input
              onFocus={handlePasswordOn}
              className="all-inputs password-input-container"
              placeholder="Password"
              type="password"
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

            {isPasswordVisible && (
              <img
                className="password-icon"
                src={passwordIcon}
                alt="password icon"
              />
            )}
            {/* {!isHomeVisible ? $$greyButton.classList.add('button-grey') : $$greyButton.classList.remove('button-grey')}; */}

            <ButtonGeneral
              className="button-grey"
              text={"Guardar perfil"}
            ></ButtonGeneral>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
