import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useEffect, useState } from "react";
import { API } from "./shared/services/api";
export const Contexto = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

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
    <Contexto.Provider value={{ token, setToken }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} />
          <Route path="secure" element={<AuthRoute component={<Secure />} />} />  */}
          </Routes>
        </Router>
      </div>
    </Contexto.Provider>
  );
}

export default App;
