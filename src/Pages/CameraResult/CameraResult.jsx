import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CameraResult.scss';

const ResultPage = () => {
  const location = useLocation();
  const detectedCode = location.state && location.state.detectedCode;

  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundProduct, setFoundProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5053/product');
        const data = response.data;

        if (Array.isArray(data)) {
          setProductData(data);
          setIsLoading(false);
        } else {
          console.log('La respuesta de la API no es un array');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (detectedCode && productData.length > 0) {
      const found = productData.find(product => product.codigo === detectedCode);

      if (found) {
        setFoundProduct(found);
      } else {
        console.log('No se encontraron coincidencias para el código:', detectedCode);
        setFoundProduct(null);
      }
    }
  }, [detectedCode, productData]);

  return (
    <div>
      {isLoading ? (
        <p>Cargando información del producto...</p>
      ) : foundProduct ? (
        <div>
          <h1>Producto Detectado:</h1>
          <p>Código: {foundProduct.codigo}</p>
          <p>Nombre: {foundProduct.nombre}</p>
          <img src={foundProduct.foto} alt={foundProduct.nombre} />
          <p>Ingredientes: {foundProduct.ingredientes}</p>
        </div>
      ) : (
        <p>No se pudo encontrar información para el código detectado</p>
      )}
    </div>
  );
};

export default ResultPage;




//NO BORRAR , TODAVIA EN TESTING

// const hasDetectedProduct = !!filteredProduct;
// const isApto = hasDetectedProduct && detectedBarcode === filteredProduct?.codigo;
// const goBack = () => {
//   window.history.back();
// };
// setDetectedQR(detectedQR);

// return (
//   <div className='page-result'>
//     <div className='head-back'>
//       <div className='hd' onClick={goBack}>
//         <img className='logo-back' src="https://icones.pro/wp-content/uploads/2021/06/symbole-fleche-gauche-bleu.png" alt='logo back'/>
//         <span className='text-b'>Volver</span>
//       </div>
//       <div>
//         <Link to='/CameraPage' >
//           <img className='logo-x-r' src='https://icones.pro/wp-content/uploads/2021/08/icone-x-grise.png' alt='logo x'/>
//         </Link>
//       </div>
//     </div>
//     <div>
//       <h1>Aqui tienes el resultado.</h1>
//     </div>
//     <div className='result-p'>
//       {hasDetectedProduct ? (
//         <div>
//           <p className='p-n'>Este producto no es apto para ti, contiene {filteredProduct.alergenosPresentes}</p>
//           {isApto ? (
//             <p className='apto'>Este producto es apto para ti</p>
//           ) : null}
//         </div>
//       ) : (
//         <p className='result-n'>Lo sentimos, no hay datos suficientes para poder valorar este producto</p>
//       )}
//     </div>
//     <div className='box-inf'>
//     <div className='image-container'>
//       <div className='my-result'>Aqui va la foto</div>

      
//       <img className='log-check-c' src='https://www.bailaconeneko.com/wp-content/uploads/2020/04/check.png' alt='checkbox'/>
     

//       <img className='log-check-b' src='https://images.freeimages.com/vhq/images/previews/176/question-mark-clip-art-89107.png' alt='checkbox'/>
      
      
//       <img className='log-check' src='https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-rose.png' alt='checkbox'/>
    
//     </div>

//     <div className='logos-container'>
//       <img className='logos-r'  src="https://w7.pngwing.com/pngs/194/804/png-transparent-favorite-star-favorites-favourite-multimedia-multimedia-icon.png" alt='Logo 1' />
//       <img className='logos-r'  src="https://w7.pngwing.com/pngs/750/391/png-transparent-computer-icons-diary-address-book-notebook-miscellaneous-rectangle-black.png" alt='Logo 2' />
//       <img className='logos-r' src="https://w7.pngwing.com/pngs/613/126/png-transparent-three-circle-and-two-line-logo-computer-icons-share-icon-sharing-symbol-share-miscellaneous-black-and-white-share.png" alt='Logo 3' />
//     </div>
//     </div>
//     <div className='scan-button'>
//     <Link to='/CameraPage' >
//       <button className='blue-button'>Escanea otro producto</button>
//       </Link>
//     </div>
//     <div>
//       {filteredProduct ? (
//         <div>
//           <h1>Producto Detectado:</h1>
//           <p>{filteredProduct.nombre}</p>
//           <img className='product-img' src={filteredProduct.foto} alt={filteredProduct.nombre} />
//           <p>Ingredientes: {filteredProduct.ingredientes.join(', ')}</p>
//           <p>Código del producto: {filteredProduct.codigo}</p>
//           <p>Alergenos presentes: {filteredProduct.alergenosPresentes}</p>
//         </div>
//       ) : (
//         <div>
//           <p>No se encontró ningún producto con el código de barras detectado.</p>
//         </div>
//       )}
//     </div>
//     <div>
//     {/* <h1>Productos</h1>
//     <ul>
//       {products.map((product) => (
//         <li key={product.id}>
//           <p>{product.nombre}</p>
//           <img className='product-img' src={product.foto} alt={product.nombre} />
//           <p>Ingredientes: {product.ingredientes.join(', ')}</p>
//           <p>Código del producto: {product.codigo}</p>
//           <p>Alergenos presentes: {product.alergenosPresentes}</p>
//         </li>
//       ))}
//     </ul> */}
//   </div>
//   <ResultPage detectedQR={detectedQR} />
//   <div>
//     <p>El código detectado es: {detectedQR}</p>
//   </div>
//   <div>
//     {isLoading ? (
//       <p>Cargando información del producto...</p>
//     ) : productDetails ? (
//       <div>
//         <h2>{productDetails.name}</h2>
//         <img src={productDetails.image} alt={productDetails.name} />
//         <p>Ingredientes: {productDetails.ingredients}</p>
//       </div>
//     ) : (
//       <p>No se pudo obtener información del producto</p>
//     )}
//   </div>
//   </div>
// );
// };

// export default ResultPage({ detectedCode });
