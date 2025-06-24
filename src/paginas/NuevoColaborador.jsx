import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta,
    mostrarAlerta
  } = useProyectos()

  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  const handleAgregar = async () => {
    await agregarColaborador({ email: colaborador.email })

    mostrarAlerta({
      msg: "Colaborador añadido correctamente",
      error: false
    })
  }

  const { msg } = alerta

  return (
    <>
      <h1 className='text-4xl font-black'>
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
      </h1>

      <div className='mt-10 flex justify-center'>
        <FormularioColaborador />
      </div>

      {msg && (
        <div className='mt-5 md:w-1/2 mx-auto'>
          <Alerta alerta={alerta} />
        </div>
      )}

      {cargando ? (
        <p className='text-center'>Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className='flex justify-center mt-10'>
            <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
              <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>
              <div className='flex justify-between items-center'>
                <p>{colaborador.nombre}</p>

                <button
                  type='button'
                  className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                  onClick={handleAgregar}
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default NuevoColaborador
