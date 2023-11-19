// import ButtonGeneral from './Components/buttonGeneral/buttonGeneral';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
// import { API } from "./shared/services/api";
import Register from "./pages/Register/Register";

import Home from "./pages/Home/Home";

import RegisterEmergencyContact from "./pages/Register/RegisterEmergencyContact";
import Intro1 from './pages/Intros/Intro1';
import Intro2 from './pages/Intros/Intro2';
import Intro3 from './pages/Intros/Intro3';
import Intro4 from './pages/Intros/Intro4';
export const Contexto = React.createContext();



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

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

    <Contexto.Provider value={{ token, setToken }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/intro1" element={<Intro1/>} />
            <Route path="/intro2" element={<Intro2/>} />
            <Route path="/intro3" element={<Intro3/>} />
            <Route path="/intro4" element={<Intro4/>} />
            <Route path="register-emergency-contact" element={<RegisterEmergencyContact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route
              path="secure"
              element={<AuthRoute component={<Secure />} />}
            /> */}
          </Routes>
        </Router>

      </div>
    </Contexto.Provider>

  );
}

export default App;
