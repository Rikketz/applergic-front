import "./App.css";

import React from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Ingredients } from "./Pages/Ingredients/Ingredients";
import { RatingApp } from "./Pages/Rating-App/Rating";
import { SuccessfulScanner } from "./Pages/SuccessfulScanner/SuccessfulScanner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Ingredientes" element={<Ingredients />} />
          <Route path="/Valoración" element={<RatingApp />} />
          <Route path="/Escaner_Exitoso" element={<SuccessfulScanner />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
