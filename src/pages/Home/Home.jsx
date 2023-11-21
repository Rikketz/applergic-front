import { useEffect, useState } from 'react';
import HomeImage from '../../assets/applergicHome.png';
import './Home.scss';
import { Navigate } from 'react-router-dom';

export default function Home(){

    const [redirectToIntro, setRedirectToIntro] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setRedirectToIntro(true);
      }, 3000);
  
      return () => clearTimeout(timer); 
  
    }, []); 

    if (redirectToIntro) {
      return <Navigate to="/intro1" />;
    }

    return <>
        <div className='p-container'>
            <h1>Applergic</h1>
            <p>Mi guía alimentaria</p>
            <div className='p-container__div'>
            <img className='p-container__div--img' src={HomeImage} alt="Imagen Logo Applergic"></img>
            </div>
        </div>
    </>
}