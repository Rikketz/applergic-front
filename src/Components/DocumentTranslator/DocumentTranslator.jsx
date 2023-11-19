import { useEffect, useState } from "react";
import axios from 'axios';


const DocumentTranslator = ({codIdioma, texto1}) => {
    const [translatedText, setTranslatedText] = useState('');
    const apiKey = "AIzaSyDBjdrh0lAKGVvS76P--Yj220X-IG_CuJg"; 

    useEffect(() => {
        if (codIdioma === 'es') {
            const translateText = async () => {
                try {
                    const response = await axios.post(
                        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
                        {
                            q: texto1,
                            source: '',
                            target: 'es',
                        }
                    );
                    const translation = response.data.data.translations[0].translatedText;
                    setTranslatedText(translation);
                } catch (error) {
                    console.error('Error al traducir:', error);
                }
            };
            translateText();
        } else {
            const translateText = async () => {
                try {
                    const response = await axios.post(
                        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
                        {
                            q: texto1,
                            source: 'es',
                            target: codIdioma,
                        }
                    );
                    const translation = response.data.data.translations[0].translatedText;
                    setTranslatedText(translation);
                } catch (error) {
                    console.error('Error al traducir:', error);
                }
            };
            translateText();
        }
    }, [codIdioma, texto1]);
    return (<>
        {translatedText}
        </> 
    )
};

export default DocumentTranslator;
