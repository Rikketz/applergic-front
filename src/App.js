// import ButtonGeneral from './Components/buttonGeneral/buttonGeneral';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
// import { API } from "./shared/services/api";
import Register from "./pages/Register/Register";
import RegisterEmergencyContact from "./pages/Register/RegisterEmergencyContact";
export const Contexto = React.createContext();

function App() {
  const [userData, setUserData] = useState({});

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
            <Route
              path="register-emergency-contact"
              element={<RegisterEmergencyContact userData={userData} />}
            />
            <Route path="login" element={<Login />} />
            <Route
              path="register"
              element={<Register setUserData={setUserData} />}
            />

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
