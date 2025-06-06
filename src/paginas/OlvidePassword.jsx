import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import contraseña from "./img/contraseña.png"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El Email es Obligatorio',
        error: true,
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })
      setAlerta({
        msg: data.msg,
        error: false,
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-green-600 font-black text-4xl capitalize">
        demuestre que el proyecto generará empleo {' '}
        <span className="text-slate-700"> directo o indirecto </span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10 relative"
        onSubmit={handleSubmit}
      >
        {/* Imagen redonda en la esquina derecha */}
         <div
              className="w-16 h-16 rounded-full absolute top-5 right-5 shadow"
              style={{
              backgroundImage: `url(${contraseña})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '6px solid white'
           }}
         ></div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword
