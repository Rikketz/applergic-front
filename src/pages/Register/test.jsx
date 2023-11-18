// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import "./Register.scss";
// import arrow from "../../assets/left-arrow.png";
// import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
// import camera from "../../assets/camera.png";
// import home from "../../assets/home.png";
// import passwordIcon from "../../assets/ojoCerrado.png";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue, // Agregamos setValue de react-hook-form
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   // Estado para almacenar la URL de la imagen seleccionada
//   const [previewImage, setPreviewImage] = useState("");

//   // Función para manejar el cambio de la imagen seleccionada
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     // Previsualizar la imagen antes de subirla
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }

//     // Actualizar el valor del campo "foto" en react-hook-form
//     setValue("foto[0]", file);
//   };

//   const registro = async (data) => {
//     const formData = new FormData();
//     formData.append("foto", data["foto[0]"]);
//     formData.append("email", data["Dirección email"]);
//     formData.append("password", data.password);
//     formData.append("nombreCompleto", data["Nombre completo"]);
//     formData.append("direccion", data["Dirección email"]);
//     formData.append("telefono", data.Móvil);

//     try {
//       const result = await axios.post(
//         "http://localhost:5053/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(result);
//       navigate("/login");
//     } catch (error) {
//       console.error("Hubo un error durante el registro:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="mini-header">
//         <div className="volver-div">
//           <div className="volver-div__content">
//             <img className="left-arrow" src={arrow} alt="arrow icon" />
//             <p>Volver</p>
//           </div>
//           <img className="homen-icon" src={home} alt="home icon" />
//         </div>

//         <p>1 de 4</p>
//       </div>

//       <h2>Dinos quién eres</h2>

//       <div className="info-block">
//         <form onSubmit={handleSubmit(registro)}>
//           <div className="camera-div">
//             <div className="upload-image">
//               {previewImage ? (
//                 <img
//                   className="camera-icon-preview"
//                   src={previewImage}
//                   alt="preview"
//                 />
//               ) : (
//                 <label htmlFor="uploadImage" className="camera-icon-label">
//                   <img className="camera-icon" src={camera} alt="camera" />
//                   Subir foto
//                 </label>
//               )}
//               <input
//                 id="uploadImage"
//                 type="file"
//                 style={{ opacity: 0, position: "absolute" }}
//                 {...register("foto[0]")}
//                 onChange={handleImageChange}
//               />
//               {errors.foto && <p>{errors.foto.message}</p>}

//               <div
//               className="upload-image"
//               onClick={() =>
//                 fileInputRef.current && fileInputRef.current.click()
//               }
//             >
//               {!selectedImage ? (
//                 <>
//                   <img src={camera} alt="camera" className="camera-icon" />
//                   <label className="upload-label" htmlFor="uploadInput">
//                     Subir foto
//                   </label>
//                 </>
//               ) : (
//                 <>
//                   <img
//                     src={URL.createObjectURL(selectedImage)}
//                     alt="profile pic"
//                   />
//                 </>
//               )}
//             </div>

//             <input
//               id="uploadInput"
//               name="foto"
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               style={{ display: "none" }}
//             />
//             </div>

//             {selectedImage && (
//             <p
//               className="p-edit"
//               onClick={() =>
//                 fileInputRef.current && fileInputRef.current.click()
//               }
//             >
//               Editar foto
//             </p>
//           )}
//           </div>
//           <div className="inputs">
//             <input
//               className="first-input"
//               placeholder="Nombre completo"
//               type="text"
//               {...register("nombreCompleto", {
//                 required: "El nombre no puede estar vacío",
//               })}
//               autoComplete="name"
//             />

//             <input
//               className="all-inputs"
//               placeholder="Dirección email"
//               type="text"
//               {...register("email", {
//                 required: "El email no puede estar vacío",
//                 pattern: {
//                   message: "El email no tiene formato correcto",
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                 },
//               })}
//               autoComplete="email"
//             />
//             {errors.email && (
//               <>
//                 {errors.email.type === "required" && (
//                   <p>{errors.email.message}</p>
//                 )}
//                 {errors.email.type === "pattern" && (
//                   <p>{errors.email.message}</p>
//                 )}
//               </>
//             )}

//             <input
//               className="all-inputs"
//               placeholder="Móvil"
//               type="tel"
//               {...register("telefono", {
//                 required: "El móvil no puede estar vacío",
//                 pattern: {
//                   message: "El móvil no tiene formato correcto",
//                   value: /^[0-9\b]+$/,
//                 },
//               })}
//               autoComplete="phone"
//             />

//             <input
//               className="all-inputs password-input-container"
//               placeholder="Password"
//               type="password"
//               {...register("password", {
//                 required: "La contraseña no puede ser vacía",
//                 pattern: {
//                   message:
//                     "La contraseña tiene que tener mayúscula, minúscula, número y símbolo entre 8 y 12 caracteres",
//                   value:
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
//                 },
//               })}
//             />

//             {errors.password && (
//               <>
//                 {errors.password.type === "required" && (
//                   <p>{errors.password.message}</p>
//                 )}
//                 {errors.password.type === "pattern" && (
//                   <p>{errors.password.message}</p>
//                 )}
//               </>
//             )}

//             <img
//               className="password-icon"
//               src={passwordIcon}
//               alt="password icon"
//             />

//             <ButtonGeneral
//               className="button"
//               text={"Guardar perfil"}
//             ></ButtonGeneral>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import "./Register.scss";
// import arrow from "../../assets/left-arrow.png";
// import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
// import camera from "../../assets/camera.png";
// import home from "../../assets/home.png";
// import passwordIcon from "../../assets/ojoCerrado.png";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue, // Agregamos setValue de react-hook-form
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   // Estado para almacenar la URL de la imagen seleccionada
//   const [previewImage, setPreviewImage] = useState("");

//   // Función para manejar el cambio de la imagen seleccionada
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     // Previsualizar la imagen antes de subirla
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }

//     // Actualizar el valor del campo "foto" en react-hook-form
//     setValue("foto[0]", file);
//   };

//   const registro = async (data) => {
//     const formData = new FormData();
//     formData.append("foto", data["foto[0]"]);
//     formData.append("email", data["Dirección email"]);
//     formData.append("password", data.password);
//     formData.append("nombreCompleto", data["Nombre completo"]);
//     formData.append("direccion", data["Dirección email"]);
//     formData.append("telefono", data.Móvil);

//     try {
//       const result = await axios.post(
//         "http://localhost:5053/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(result);
//       navigate("/login");
//     } catch (error) {
//       console.error("Hubo un error durante el registro:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="mini-header">
//         <div className="volver-div">
//           <div className="volver-div__content">
//             <img className="left-arrow" src={arrow} alt="arrow icon" />
//             <p>Volver</p>
//           </div>
//           <img className="homen-icon" src={home} alt="home icon" />
//         </div>

//         <p>1 de 4</p>
//       </div>

//       <h2>Dinos quién eres</h2>

//       <div className="info-block">
//         <form onSubmit={handleSubmit(registro)}>
//           <div className="camera-div">
//             <div className="upload-image">
//               {previewImage ? (
//                 <img
//                   className="camera-icon-preview"
//                   src={previewImage}
//                   alt="preview"
//                 />
//               ) : (
//                 <label htmlFor="uploadImage" className="camera-icon-label">
//                   <img className="camera-icon" src={camera} alt="camera" />
//                   Subir foto
//                 </label>
//               )}
//               <input
//                 id="uploadImage"
//                 type="file"
//                 style={{ opacity: 0, position: "absolute" }}
//                 {...register("foto[0]")}
//                 onChange={handleImageChange}
//               />
//               {errors.foto && <p>{errors.foto.message}</p>}

//               {/* <div
//               className="upload-image"
//               onClick={() =>
//                 fileInputRef.current && fileInputRef.current.click()
//               }
//             >
//               {!selectedImage ? (
//                 <>
//                   <img src={camera} alt="camera" className="camera-icon" />
//                   <label className="upload-label" htmlFor="uploadInput">
//                     Subir foto
//                   </label>
//                 </>
//               ) : (
//                 <>
//                   <img
//                     src={URL.createObjectURL(selectedImage)}
//                     alt="profile pic"
//                   />
//                 </>
//               )}
//             </div>

//             <input
//               id="uploadInput"
//               name="foto"
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               style={{ display: "none" }}
//             /> */}
//             </div>

//             {/* {selectedImage && (
//             <p
//               className="p-edit"
//               onClick={() =>
//                 fileInputRef.current && fileInputRef.current.click()
//               }
//             >
//               Editar foto
//             </p>
//           )} */}
//           </div>
//           <div className="inputs">
//             <input
//               className="first-input"
//               placeholder="Nombre completo"
//               type="text"
//               {...register("nombreCompleto", {
//                 required: "El nombre no puede estar vacío",
//               })}
//               autoComplete="name"
//             />

//             <input
//               className="all-inputs"
//               placeholder="Dirección email"
//               type="text"
//               {...register("email", {
//                 required: "El email no puede estar vacío",
//                 pattern: {
//                   message: "El email no tiene formato correcto",
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                 },
//               })}
//               autoComplete="email"
//             />
//             {errors.email && (
//               <>
//                 {errors.email.type === "required" && (
//                   <p>{errors.email.message}</p>
//                 )}
//                 {errors.email.type === "pattern" && (
//                   <p>{errors.email.message}</p>
//                 )}
//               </>
//             )}

//             <input
//               className="all-inputs"
//               placeholder="Móvil"
//               type="tel"
//               {...register("telefono", {
//                 required: "El móvil no puede estar vacío",
//                 pattern: {
//                   message: "El móvil no tiene formato correcto",
//                   value: /^[0-9\b]+$/,
//                 },
//               })}
//               autoComplete="phone"
//             />

//             <input
//               className="all-inputs password-input-container"
//               placeholder="Password"
//               type="password"
//               {...register("password", {
//                 required: "La contraseña no puede ser vacía",
//                 pattern: {
//                   message:
//                     "La contraseña tiene que tener mayúscula, minúscula, número y símbolo entre 8 y 12 caracteres",
//                   value:
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
//                 },
//               })}
//             />

//             {errors.password && (
//               <>
//                 {errors.password.type === "required" && (
//                   <p>{errors.password.message}</p>
//                 )}
//                 {errors.password.type === "pattern" && (
//                   <p>{errors.password.message}</p>
//                 )}
//               </>
//             )}

//             <img
//               className="password-icon"
//               src={passwordIcon}
//               alt="password icon"
//             />

//             <ButtonGeneral
//               className="button"
//               text={"Guardar perfil"}
//             ></ButtonGeneral>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   const registro = async (data) => {
//     const formData = new FormData();
//     formData.append("foto", data.foto[0]); // Asegúrate de usar la misma clave "foto"
//     formData.append("email", data["Dirección email"]); // Utiliza "email" en lugar de "Dirección email"
//     formData.append("password", data.password);
//     formData.append("nombreCompleto", data["Nombre completo"]); // Utiliza "nombreCompleto" en lugar de "Nombre completo"
//     formData.append("direccion", data["Dirección email"]); // Utiliza "direccion" en lugar de "Dirección email"
//     formData.append("telefono", data.Móvil); // Utiliza "telefono" en lugar de "Móvil"

//     try {
//       const result = await axios.post(
//         "http://localhost:5053/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(result);
//       navigate("/login");
//     } catch (error) {
//       console.error("Hubo un error durante el registro:", error);
//     }

//     return (
//       <div>
//         <div className="mini-header">
//           <div className="volver-div">
//             <div className="volver-div__content">
//               <img className="left-arrow" src={arrow} alt="arrow icon" />
//               <p>Volver</p>
//             </div>
//             <img className="homen-icon" src={home} alt="home icon" />
//           </div>

//           <p>1 de 4</p>
//         </div>

//         <h2>Dinos quién eres</h2>
//         <div className="camera-div">
//           <div className="upload-image">
//             <img className="camera-icon" src={camera} alt="camera" />
//             <label htmlFor="uploadImage">Subir foto</label>
//             <input
//               id="uploadImage"
//               type="file"
//               style={{ display: "none" }}
//               {...register("foto")}
//             />
//             {errors.foto && <p>{errors.foto.message}</p>}
//           </div>
//           <p className="p-edit">Editar foto</p>
//         </div>
//         <div className="info-block">
//           <form onSubmit={handleSubmit(registro)}>
//             <div className="inputs">
//               <input
//                 className="first-input"
//                 placeholder="Nombre completo"
//                 type="text"
//                 {...register("Nombre completo", {
//                   required: "El nombre no puede estar vacío",
//                 })}
//               />

//               <input
//                 className="all-inputs"
//                 placeholder="Dirección email"
//                 type="text"
//                 {...register("Dirección email", {
//                   required: "El email no puede estar vacío",
//                   pattern: {
//                     message: "El email no tiene formato correcto",
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <>
//                   {errors.email.type === "required" && (
//                     <p>{errors.email.message}</p>
//                   )}
//                   {errors.email.type === "pattern" && (
//                     <p>{errors.email.message}</p>
//                   )}
//                 </>
//               )}

//               <input
//                 className="all-inputs"
//                 placeholder="Móvil"
//                 type="tel"
//                 {...register("Móvil", {
//                   required: "El móvil no puede estar vacío",
//                   pattern: {
//                     message: "El móvil no tiene formato correcto",
//                     value: /^[0-9\b]+$/,
//                   },
//                 })}
//               />

//               <input
//                 className="all-inputs password-input-container"
//                 placeholder="Password"
//                 type="password"
//                 {...register("password", {
//                   required: "La contraseña no puede ser vacía",
//                   pattern: {
//                     message:
//                       "La contraseña tiene que tener mayúscula, minúscula, número y símbolo entre 8 y 12 caracteres",
//                     value:
//                       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
//                   },
//                 })}
//               />

//               {errors.password && (
//                 <>
//                   {errors.password.type === "required" && (
//                     <p>{errors.password.message}</p>
//                   )}
//                   {errors.password.type === "pattern" && (
//                     <p>{errors.password.message}</p>
//                   )}
//                 </>
//               )}

//               <img
//                 className="password-icon"
//                 src={passwordIcon}
//                 alt="password icon"
//               />

//               <ButtonGeneral
//                 className="button"
//                 text={"Guardar perfil"}
//               ></ButtonGeneral>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };
// };

// export default Register;
