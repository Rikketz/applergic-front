import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secure from "./pages/Secure";
import Navbar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import React, { useEffect, useState } from "react";
import { API } from "./shared/services/api";
export const Contexto = React.createContext();

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const result = await API.get("users/checksession");
      console.log(result);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      // navigate('/login')
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
  return (
    <Contexto.Provider value={{ token, setToken }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="secure" element={<AuthRoute component={<Secure />} />} />
        </Routes>
      </div>
    </Contexto.Provider>
  );
}

export default App;
