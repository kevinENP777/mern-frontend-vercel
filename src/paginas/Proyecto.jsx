import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTareas';
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';
// añadido
const [colaboradores, setColaboradores] = useState([]);

// añadido
useEffect(() => {
  const guardados = JSON.parse(localStorage.getItem('colaboradores')) || [];
  setColaboradores(guardados);
}, []);
// fin añadido

const Proyecto = () => {
    const params = useParams();
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyectos();

    useEffect(() => {
        obtenerProyecto(params.id);
    }, [params.id]);

    const { nombre } = proyecto;
    const { msg } = alerta;

    if (cargando) return 'Cargando.....';

    return (
        <>
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h1 className="font-black text-4xl text-green-700">{nombre}</h1>
                <div className="flex items-center gap-2 text-green-600 hover:text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                    </svg>

                    <Link to={`/proyectos/editar/${params.id}`} className="uppercase font-bold">
                        Editar
                    </Link>
                </div>
            </div>

            <button
                onClick={handleModalTarea}
                type="button"
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-green-600 text-white text-center mt-5 flex gap-2 items-center justify-center hover:bg-green-700 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                    />
                </svg>
                Nueva Tarea
            </button>

            <p className="font-bold text-xl mt-10 text-green-700">Tareas del Nuevo Emprendimiento</p>

            <div className='flex justify-between'>
                <div className='w-full md:w-1/3 lg:w-1/4'>
                    {msg && <Alerta alerta={alerta} />}
                </div>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg border-l-4 border-green-600">
                {proyecto.tareas?.length ? (
                    proyecto.tareas.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
                ) : (
                    <p className="text-center my-5 p-10 text-green-600">No hay tareas para este Emprendimiento </p>
                )}
            </div>

            <div className='flex items-center justify-between mt-10'> 
                <p className='font-bold text-xl text-green-700'>Colaborador</p>
                <h2 className="text-lg font-bold mt-10">Colaborador</h2>
                // añadido
                    <ul className="mt-2">
                    {colaboradores.map((correo, index) => (
                        <li key={index} className="text-sm text-gray-700">
                        {correo}
                        </li>
                    ))}
                    </ul>
                    // fin añadido

                <Link
                    to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                    className='text-green-600 hover:text-black uppercase font-bold'
                >
                    Añadir
                </Link>
            </div>

            <ModalFormularioTarea />
            <ModalEliminarTarea />
        </>
    );
};

export default Proyecto;
