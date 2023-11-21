

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./ResultPage.scss";
import { Contexto } from "../../App";
import { jwtDecode } from "jwt-decode";

export default function ResultPage({ detectedCode, userId }) {
  const location = useLocation();
  const detectedQRCode = location.state && location.state.detectedCode;
  const detectedBarcode = location.state && location.state.detectedBarcode;
  const [productData, setProductData] = useState([]);
  const [foundProduct, setFoundProduct] = useState(null);
  const [alergiaList, setAlergiaList] = useState();
  const [loading, setLoading] = useState(true);
  const { codigoParaPasar, setCodigoParaPasar } = useContext(Contexto);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5053/product");
        const data = response.data;

        if (Array.isArray(data)) {
          setProductData(data);
          setLoading(false);
        } else {
          console.log("La respuesta de la API no es un array");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (detectedQRCode && productData.length > 0) {
      const codigoAsNumber = parseInt(detectedQRCode, 10);
      const matchingProduct = productData.find(
        (product) => parseInt(product.codigo, 10) === codigoAsNumber
      );
      if (matchingProduct) {
        setFoundProduct(matchingProduct);
        console.log(matchingProduct);
        setCodigoParaPasar(matchingProduct.codigo);
      } else {
        console.log(
          "No se encontraron coincidencias para el código:",
          detectedQRCode
        );
        setFoundProduct(null);
      }
    }

    if (detectedBarcode && productData.length > 0) {
      const matchingBarcodeProduct = productData.find(
        (product) => product.codigo === detectedBarcode
      );
      if (matchingBarcodeProduct) {
        setFoundProduct(matchingBarcodeProduct);

        console.log(
          "Producto encontrado por código de barras:",
          matchingBarcodeProduct
        );
      } else {
        console.log(
          "No se encontraron coincidencias para el código de barras:",
          detectedBarcode
        );
        setFoundProduct(null);
      }
    }
  }, [detectedQRCode, detectedBarcode, productData]);

  const goBack = () => {
    window.history.back();
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (foundProduct) {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken) {
            const { id, alergia } = decodedToken;
            try {
              const response = await fetch(`http://localhost:5053/user/getuser/${id}`);
              const userData = await response.json();
              const listaAlergias = userData.user.alergia;
              setAlergiaList(listaAlergias);

              const productAllergens = foundProduct.alergenosPresentes || [];
              const allergensMatch = listaAlergias.some(alergia =>
                productAllergens.includes(alergia)
              );

              if (allergensMatch) {
                console.log("Al menos una alergia del usuario coincide con los alérgenos presentes en el producto.");
                alert("Este producto contiene al menos un alérgeno que coincide con tus alergias. No es apto para ti.");
              } else {
                console.log("Ninguna alergia del usuario coincide con los alérgenos presentes en el producto.");
              }
            } catch (error) {
              console.error("Error al obtener el nombre del usuario:", error);
            }
          }
        }
      }
    };

    fetchUserData();
  }, [foundProduct]);

  return (
    <div className={`page-result${foundProduct ? "" : " no-match"}`}>
      {loading ? (
        <div className="loading">Buscando...</div>
      ) : (
        <React.Fragment>
          <div className="head-back">
            <div className="hd" onClick={goBack}>
              <img
                className="logo-back"
                src="https://icones.pro/wp-content/uploads/2021/06/symbole-fleche-gauche-bleu.png"
                alt="logo back"
              />
              <span className="text-b">Volver</span>
            </div>
            <div>
              <Link to="/CameraPage">
                <img
                  className="logo-x-r"
                  src="https://icones.pro/wp-content/uploads/2021/08/icone-x-grise.png"
                  alt="logo x"
                />
              </Link>
            </div>
          </div>
          <div>
            <h1>Aqui tienes el resultado.</h1>
          </div>

          <div className="result-p">
            {foundProduct ? (
              <p className="apto">Este producto es apto para ti</p>
            ) : (
              <p className="result-n">
                Lo sentimos, no hay datos suficientes para poder valorar este
                producto
              </p>
            )}
            <p className="p-n">
              Este producto no es apto para ti, contiene{" "}
              {foundProduct?.alergenosPresentes.join(", ")}
            </p>
          </div>

          <div>
            <div>
              <p className="code">Código: {foundProduct?.codigo}</p>
              <p className="ing">
                Ingredientes: {foundProduct?.ingredientes.join(", ")}
              </p>

              <div className="box-inf">
                <div className="image-container">
                  <div className="my-result">
                    {foundProduct && (
                      <img
                        className="img-r"
                        src={foundProduct.foto}
                        alt={foundProduct.nombre}
                      />
                    )}
                  </div>
                  <img
                    className="log-check-c"
                    src="https://www.bailaconeneko.com/wp-content/uploads/2020/04/check.png"
                    alt="checkbox"
                  />
                  <img
                    className="log-check-b"
                    src="https://images.freeimages.com/vhq/images/previews/176/question-mark-clip-art-89107.png"
                    alt="checkbox"
                  />
                  <img
                    className="log-check"
                    src="https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-rose.png"
                    alt="checkbox"
                  />
                </div>

                <div className="logos-container">
                  <img
                    className="logos-r"
                    src="https://w7.pngwing.com/pngs/194/804/png-transparent-favorite-star-favorites-favourite-multimedia-multimedia-icon.png"
                    alt="Logo 1"
                  />
                  <Link to={"/generateInform"}>
                    <img
                      className="logos-r"
                      src="https://w7.pngwing.com/pngs/750/391/png-transparent-computer-icons-diary-address-book-notebook-miscellaneous-rectangle-black.png"
                      alt="Logo 2"
                    />
                  </Link>
                  <img
                    className="logos-r"
                    src="https://w7.pngwing.com/pngs/613/126/png-transparent-three-circle-and-two-line-logo-computer-icons-share-icon-sharing-symbol-share-miscellaneous-black-and-white-share.png"
                    alt="Logo 3"
                  />
                </div>
              </div>

              <p className="nm">Nombre: {foundProduct?.nombre}</p>
              <p className="marc">Marca: {foundProduct?.marca}</p>
              <p className="ap">
                Alergenos presentes:{" "}
                {foundProduct?.alergenosPresentes?.join(", ")}
              </p>
            </div>
          </div>

          <div className="scan-button">
            <Link to="/CameraPage">
              <button className="blue-button">Escanea otro producto</button>
            </Link>
          </div>

          <div></div>
        </React.Fragment>
      )}
    </div>
  );
}