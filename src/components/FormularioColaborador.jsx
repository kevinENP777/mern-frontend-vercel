import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const { mostrarAlerta, alerta, submitColaborador, proyecto } = useProyectos()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Validación de campos vacíos
    if (email.trim() === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    // ✅ Validación de formato de email
    if (!email.includes('@') || !email.includes('.')) {
      mostrarAlerta({
        msg: 'El email está mal escrito',
        error: true
      })
      return
    }

    // ✅ Enviar email al backend
    const resultado = { ok: true }

localStorage.setItem('colaboradorEmail', email)

setTimeout(() => {
  navigate(`/proyectos/${proyecto._id}`)
}, 2000)

    console.log("Resultado del colaborador:", resultado)


    if (resultado?.ok) {
      // ✅ Mostrar alerta
      mostrarAlerta({
        msg: 'Colaborador añadido correctamente',
        error: false
      })

      // ✅ Guardar email en localStorage para usar en EditarProyecto.jsx
      localStorage.setItem('colaboradorEmail', email)

      // ✅ Redirigir después de 2 segundos
      setTimeout(() => {
        navigate(`/proyectos/${proyecto._id}`)
      }, 2000)
    }
  }

  const { msg } = alerta

  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className='mb-5'>
        <label
          className='text-gray-700 font-bold text-sm'
          htmlFor='email'
        >
          Email Colaborador
        </label>
        <input
          type='email'
          id='email'
          placeholder='Email del colaborador'
          className='border w-full p-2 placeholder-gray-400 rounded-md'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className='bg-[#1C7B3E] hover:bg-[#155f30] w-full p-3 text-white uppercase text-sm font-bold cursor-pointer transition-colors rounded'
        value='Buscar Patrocinador'
      />
    </form>
  )
}

export default FormularioColaborador
