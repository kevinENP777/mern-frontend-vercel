import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
// import image from "./img/image.png" // fondo 

const Login = () => {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [alerta, setAlerta]= useState({})

    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const correoAdmin = "admin@sena.edu.com"

    const handleSubmit = async e => {
        e.preventDefault()

        if ([email,password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            localStorage.setItem('token', data.token) 
            setAuth(data)
            if (email === correoAdmin) {
                navigate('/login-admin')
            } else {
                navigate('/proyectos')
            }
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <div>
            <h1 className="text-green-600 font-black text-3xl capitalize text-center drop-shadow-lg">
                Fondo Emprender{' '}
                <span className="text-black"> SENA. </span>
            </h1>

            {/* CONTENEDOR PARA IGUALAR ANCHO */}
            <div className="w-full max-w-md mx-auto">
                {msg && <Alerta alerta={alerta} />}

                <form 
                    className="my-10 bg-white shadow rounded-lg p-10 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">  
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div> 
                    
                    <div className="my-5">  
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                            htmlFor="password"
                        >password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password de Registro"
                            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div> 

                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className='bg-[#1C7B3E] mb-5 w-full py-3 text-white uppercase font-bold rounded
                        hover:cursor-pointer hover:bg-[#1C7B3E] transition-colors'
                    />
                </form>

                <nav className="lg:flex lg:justify-between w-full">
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to='/registrar'
                    >¿No tienes una cuenta? Regístrate</Link>
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to='/olvide-password'
                    >Olvidé mi Password</Link>
                </nav>
            </div>
        </div>
    )
}
  
export default Login


// colores customizables
// linear-gradient(rgba(0,0,0,0.3),

