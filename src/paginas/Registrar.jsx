import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import logosena from './img/logosena.png' // imagen de la esquina derecha de arriba

const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta,setAlerta ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if ([nombre, email, password, repetirPassword].includes('')) {
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
        return
    }
    if (password !== repetirPassword) {
        setAlerta({
          msg: 'Los password no son iguales',
            error: true
          })
          return
        }
    if (password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto, agrega minimo 6 caracteres ',
          error: true
        })
        return
    }
  
    setAlerta({}) // limpia el error 
// crea el usuario desde Api
    try {
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('email', email)
      formData.append('password', password)
      // formData.append('archivo', archivo) // El archivo PDF

      const { data } = await clienteAxios.post(`/usuarios`, 
        {nombre, email, password} // Enviar los datos al backend
      )

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg ,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-green-600 font-black text-6xl capitalize">gestion de trabajos de {' '}
          <span className="text-slate-600">gestion de investigaciones</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10 relative"
        onSubmit={handleSubmit}>

        <div
          className="w-16 h-16 rounded-full absolute top-5 right-5 shadow"
          style={{
            backgroundImage: `url(${logosena})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: '6px solid white'
          }}
        ></div>

        <div className="my-5">  
            <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="nombre">Nombre</label>
            <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div> 
        
        <div className="my-5">  
            <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
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
            <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Password de Registro"
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div> 
        
        <div className="my-5">  
            <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password2">Repetir Password</label>
            <input
                id="password2"
                type="password"
                placeholder="Repetir Password"
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
            />
        </div> 

        <input
            type="submit"
            value="Iniciar"
            className='bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
            hover:cursor-pointer hover:bg-green-800 transition-colors'
        />
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>
              ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/olvide-password'>
              Olvidé mi Password
          </Link>
      </nav>
    </>
  )
}

export default Registrar
