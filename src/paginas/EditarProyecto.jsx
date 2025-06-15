import { useEffect,  useState  } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FormularioProyecto from "../components/FormularioProyecto"
import useProyectos from "../hooks/useProyectos"

const EditarProyecto = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos()

    // ✅ CAMBIO AÑADIDO: Estado para guardar el email del colaborador nuevo
    const [nuevoColaborador, setNuevoColaborador] = useState('')

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    // ✅ CAMBIO AÑADIDO: Revisamos si hay un colaborador recién añadido en localStorage
    useEffect(() => {
        const emailGuardado = localStorage.getItem('colaboradorEmail')
        if (emailGuardado) {
            setNuevoColaborador(emailGuardado)
            localStorage.removeItem('colaboradorEmail')
        }
    }, [])

    const handleClick = () => {
        if (confirm('¿Deseas eliminar este proyecto?')) {
            eliminarProyecto(params.id)
        }
    }

    const handleEnviar = () => {
        navigate("/admin")
    }

    const { nombre } = proyecto

    //if (cargando) return '' // cargando

    return (
        <div className="px-4 py-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex justify-center items-start">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-6xl">

                {/* ✅ CAMBIO AÑADIDO: Alerta con el email del colaborador si existe */}
                {nuevoColaborador && (
                    <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative mb-6 text-center">
                        ✅ Colaborador añadido: <strong>{nuevoColaborador}</strong>
                    </div>
                )}

                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10'>
                    <h1 className='font-extrabold text-3xl md:text-4xl text-green-800 mb-4 md:mb-0'>
                        Editar Proyecto: <span className="text-gray-700">{nombre}</span>
                    </h1>
                    <div className='flex items-center gap-2'>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
                            EDITAR
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center gap-1"
                            onClick={handleClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            ELIMINAR
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600 max-w-4xl mx-auto">
                    <FormularioProyecto />

                    {/* ✅ CAMBIO AÑADIDO: Mostrar sección Colaborador si se añadió */}
                    {nuevoColaborador && (
                        <div className="mt-10 bg-green-50 p-4 rounded-xl shadow-inner border border-green-300">
                            <h2 className="text-green-800 text-2xl font-bold">Colaborador</h2>
                            <p className="text-gray-700 mt-2">
                                <span className="font-semibold">Correo añadido:</span> {nuevoColaborador}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditarProyecto
