import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTareas';
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';

const Proyecto = () => {
  const params = useParams();
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    mostrarAlerta
  } = useProyectos();

  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [params.id]);

  // Leer solo los colaboradores de este proyecto desde localStorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('colaboradores')) || {};
    const delProyecto = todos[params.id] || [];
    setColaboradores(delProyecto);
  }, [params.id]);

  //  Función para eliminar colaborador solo de este proyecto
  const eliminarColaborador = (indice) => {
    const nuevos = [...colaboradores];
    nuevos.splice(indice, 1);
    setColaboradores(nuevos);

    const todos = JSON.parse(localStorage.getItem('colaboradores')) || {};
    todos[params.id] = nuevos;
    localStorage.setItem('colaboradores', JSON.stringify(todos));

    mostrarAlerta({
      msg: 'Colaborador eliminado correctamente',
      error: false
    });
  };

  const { nombre } = proyecto;
  const { msg } = alerta;

  if (cargando) return 'Cargando.....';

  return (
    <>
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="font-black text-4xl text-green-700">{nombre}</h1>
        <div className="flex items-center gap-2 text-green-600 hover:text-black">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6 6m0 0l-6-6m6 6L9 13m6 6l6-6m-6 6L9 13"></path>
          </svg>
          <Link to={`/proyectos/editar/${params.id}`} className="uppercase font-bold">
            Editar
          </Link>
        </div>
      </div>

      <button
        onClick={handleModalTarea}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-green-600 text-white text-center"
      >
        + Nueva Tarea
      </button>

      <p className="font-bold text-xl mt-10">Tareas del Nuevo Emprendimiento</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
        ) : (
          <p className="text-center my-5 p-10">No hay tareas</p>
        )}
      </div>

      <h2 className="text-lg font-bold mt-10">Colaborador</h2>
      <ul className="mt-2">
        {colaboradores.length === 0 ? (
          <li className="text-sm text-gray-500">Aún no hay colaboradores</li>
        ) : (
          colaboradores.map((correo, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 flex items-center justify-between mb-2"
            >
              {correo}
              <button
                onClick={() => eliminarColaborador(index)}
                className="ml-4 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="flex justify-end mt-4">
        <Link
          to={`/proyectos/nuevo-colaborador/${params.id}`}
          className="text-sm uppercase font-bold text-green-600"
        >
          Añadir
        </Link>
      </div>

      <ModalFormularioTarea />
      <ModalEliminarTarea />

      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Proyecto;
