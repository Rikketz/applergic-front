import HomeImage from '../../assets/applergicHome.png';
import './Home.scss';

export default function Home(){

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