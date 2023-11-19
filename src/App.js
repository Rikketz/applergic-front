import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useEffect, useState } from "react";
import { API } from "./shared/services/api";
import Register from "./pages/Register/Register";
import DocumentTranslated from "./pages/DocumentTranslated/DocumentTranslated";
import DocumentTranslated2 from "./pages/DocumentTranslated2/DocumentTranslated2";
import GenerateInform from "./pages/GenerateInform/GenerateInform";
export const Contexto = React.createContext();


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idioma, setIdioma] = useState("");
  const languageSelectedList = useState([]);

  const checkSession = async () => {
    try {
      const result = await API.get("users/checksession");
      console.log(result);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
  return (

    <Contexto.Provider value={{ token, setToken, idioma, setIdioma, languageSelectedList }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="generateInform/inform1" element={<DocumentTranslated />} />
            <Route path="generateInform/inform2" element={<DocumentTranslated2 />} />
            <Route path="generateInform" element={<GenerateInform />} />
          </Routes>
        </Router>

      </div>

    </Contexto.Provider>

  );
}

export default App;
