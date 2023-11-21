import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../App";
import logoutIcon from "../../assets/pictures/salida-de-emergencia.png"
import "./Logout.scss";
const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(Contexto);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); 
    setToken(null);
    navigate("/login");
  };

  return (
    <div onClick={handleLogout}>
      <img
        src={logoutIcon}
        alt="Cerrar sesión"
        className="logout-icon"
      />
    </div>
  );
};

export default Logout;