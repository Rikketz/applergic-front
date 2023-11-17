import logo from './logo.svg';
import './App.css';
import ButtonGeneral from './Components/buttonGeneral/buttonGeneral';
import React from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Hamburguesa from './Components/Hamburguesa/Hamburguesa';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hamburguesa></Hamburguesa>
        <ButtonGeneral text={"Hola"}/>

        
      </header>
    </div>
  );
}

export default App;
