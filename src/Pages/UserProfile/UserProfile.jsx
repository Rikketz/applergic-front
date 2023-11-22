import React, { useEffect, useState } from "react";
import axios from "axios";
import arrow from "../../assets/left-arrow.png";
import home from "../../assets/home.png";
import logo from "../../assets/logo.png";
import "./UserProfile.scss";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        const response = await axios.get(
          `http://localhost:5053/user/getuser/${userId}`
        );
  
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="mini-header">
        <div className="volver-div">
          <div className="volver-div__content">
            <img className="left-arrow" src={arrow} alt="arrow icon" />
            <p className="p-volver" onClick={goBack}>
              Volver
            </p>
          </div>

          {/* <img className="homen-icon" src={home} alt="home icon" /> */}
        </div>

        <img className="applergic-logo" src={logo} alt="applergic logo" />
      </div>
      <h1 className="h1-style">Mi perfil</h1>
      <img
        className="userinfo-img"
        width="100px"
        src={userData.user.foto}
        alt="Foto de perfil"
      />
      <p className="p-edit">Editar perfil</p>
      <div className="userinfo-div">
        <p className="userinfo-div__pstyle">
          <span className="span-syle"> Nombre:</span> {userData.user.nombreCompleto}
        </p>
        <p className="userinfo-div__pstyle">
          <span className="span-syle">Email:</span> {userData.user.email}
        </p>
        <p className="userinfo-div__pstyle">
          <span className="span-syle">Télefono:</span> {userData.user.telefono}
        </p>
      </div>
      <h4 className="h4-style">Contacto de emergencia</h4>
      <div className="emergencycontact-div">
        <p className="emergencycontact-div__pstyle">
          <span className="span-syle">Nombre:</span> {userData.user.contactoEmergencia.nombreContacto}
        </p>
        <p className="emergencycontact-div__pstyle">
          <span className="span-syle">Email:</span> {userData.user.contactoEmergencia.emailContacto}
        </p>
        <p className="emergencycontact-div__pstyle">
          <span className="span-syle">Télefono:</span>{" "}
          {userData.user.contactoEmergencia.telefonoContacto}
        </p>
        <p className="emergencycontact-div__pstyle">
          <span className="span-syle">Póliza:</span> {userData.user.contactoEmergencia.poliza}
        </p>
      </div>

      <div>
        <h4 className="h4-style">Mis alergias:</h4>
        <ul className="alergia-ul">
          {userData.user.alergia.map((alergia, index) => (
            <li className="alergia-ul__li" key={index}>
              - {alergia}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
