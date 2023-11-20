import Ingredients from "./pages/Ingredients/Ingredients";
import RatingApp from "./pages/Rating-App/Rating";
import SuccessfulScanner from "./pages/SuccessfulScanner/SuccessfulScanner";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
import Register from "./pages/Register/Register";
import DocumentTranslated from "./pages/DocumentTranslated/DocumentTranslated";
import DocumentTranslated2 from "./pages/DocumentTranslated2/DocumentTranslated2";
import GenerateInform from "./pages/GenerateInform/GenerateInform";
import Home from "./pages/Home/Home";
import RegisterEmergencyContact from "./pages/Register/RegisterEmergencyContact";
import Intro1 from "./pages/Intros/Intro1";
import Intro2 from "./pages/Intros/Intro2";
import Intro3 from "./pages/Intros/Intro3";
import Intro4 from "./pages/Intros/Intro4";
import Main from "./pages/Main/Main";
export const Contexto = React.createContext();

function App() {
  const [userData, setUserData] = useState({});

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idioma, setIdioma] = useState("");
  const languageSelectedList = useState([]);

  // const checkSession = async () => {
  //   try {
  //     const result = await API.get("/checksession");
  //     console.log(result);
  //   } catch (error) {
  //     localStorage.removeItem("token");
  //     setToken(null);
  //   }
  // };
  // useEffect(() => {
  //   checkSession();
  // }, []);

  return (
    <Contexto.Provider
      value={{ token, setToken, idioma, setIdioma, languageSelectedList }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/Ingredientes" element={<Ingredients />} />
            <Route path="/Valoración" element={<RatingApp />} />
            <Route path="/Escaner_Exitoso" element={<SuccessfulScanner />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/intro1" element={<Intro1 />} />
            <Route path="/intro2" element={<Intro2 />} />
            <Route path="/intro3" element={<Intro3 />} />
            <Route path="/intro4" element={<Intro4 />} />
            <Route
              path="register-emergency-contact"
              element={<RegisterEmergencyContact userData={userData} />}
            />
            <Route path="login" element={<Login />} />
            <Route
              path="register"
              element={<Register setUserData={setUserData} />}
            />
            <Route
              path="generateInform/inform1"
              element={<DocumentTranslated />}
            />
            <Route
              path="generateInform/inform2"
              element={<DocumentTranslated2 />}
            />
            <Route path="generateInform" element={<GenerateInform />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </Contexto.Provider>
  );
}

export default App;
