// import Ingredients from "./pages/Ingredients/Ingredients";
import RatingApp from "./Pages/Rating-App/Rating";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import React, { useEffect, useState } from "react";
import Register from "./Pages/Register/Register";
import DocumentTranslated from "./Pages/DocumentTranslated/DocumentTranslated";
import DocumentTranslated2 from "./Pages/DocumentTranslated2/DocumentTranslated2";
import GenerateInform from "./Pages/GenerateInform/GenerateInform";
import Home from "./Pages/Home/Home";
import RegisterEmergencyContact from "./Pages/Register/RegisterEmergencyContact";
import Intro1 from "./Pages/Intros/Intro1";
import Intro2 from "./Pages/Intros/Intro2";
import Intro3 from "./Pages/Intros/Intro3";
import Intro4 from "./Pages/Intros/Intro4";
import ResultPage from "./Pages/ResultPage/ResultPage";
import CameraPage from "./Pages/CameraPage/CameraPage";
import axios from "axios";
import IngredientsTest from "./Pages/Ingredients/IngredientsTest";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Main from "./Pages/Main/Main";
import FirstScanner from "./Pages/SuccessfulScanner/SuccessfulScanner";
export const Contexto = React.createContext();

function App() {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idioma, setIdioma] = useState("");
  const [languageSelectedList, setLanguageSelectedList] = useState([]);
  const [alergenos, setAlergenos] = useState([]);
  const [codigoParaPasar, setCodigoParaPasar] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5053/alergeno")

      .then((response) => {
        setAlergenos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener alérgenos:", error);
      });
  }, []);

  return (
    <Contexto.Provider
      value={{
        token,
        setToken,
        idioma,
        setIdioma,
        languageSelectedList,
        setLanguageSelectedList,
        alergenos,
        setAlergenos,
        codigoParaPasar,
        setCodigoParaPasar,
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/ingredientes" element={<IngredientsTest />} />
            <Route path="/valoracion" element={<RatingApp />} />
            <Route path="/escaner" element={<FirstScanner />} />
            <Route path="/main" element={<Main />} />
            <Route path="/intro1" element={<Intro1 />} />
            <Route path="/intro2" element={<Intro2 />} />
            <Route path="/intro3" element={<Intro3 />} />
            <Route path="/intro4" element={<Intro4 />} />
            <Route path="/camerapage" element={<CameraPage />} />
            <Route path="/resultpage" element={<ResultPage />} />
            <Route
              path="register-emergency-contact"
              element={<RegisterEmergencyContact userData={userData} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="userprofile" element={<UserProfile />} />
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
