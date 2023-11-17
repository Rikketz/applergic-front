import React, { useContext } from 'react'
import {useForm} from 'react-hook-form';
import { API } from '../../shared/services/api';
import { useNavigate } from 'react-router-dom';
import { Contexto } from '../../App';

const Login = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();
    const {setToken} = useContext(Contexto);
    
    const log = async(data) => {
        const result = await API.post("http://localhost:5053/users/login", data)
        console.log(result);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        navigate("/")
    }
  return (
    <form onSubmit={handleSubmit(log)}>
        <input type='text' {...register('email', {
            required: "El email no puede estar vacio",
            pattern: {
                message: "el email no tiene formato correcto",
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            }
        })} />
        {errors.email && <>
            {errors.email.type === "required" && <p>{errors.email.message}</p>}
            {errors.email.type === "pattern" && <p>{errors.email.message}</p>}
        </>}
        <input type='text' {...register('password', {
            required: "La contraseña no puede ser vacia",
            pattern: {
                message: "el password tiene que tener mayuscuala minuscula numero y simbolo y entre 8 y 12 caracteres",
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/   
            }
        })} />
        {errors.password && <>
            {errors.password.type === "required" && <p>{errors.password.message}</p>}
            {errors.password.type === "pattern" && <p>{errors.password.message}</p>}
        </>}
        <button>Entrar</button>
    </form>
  )
}

export default Login