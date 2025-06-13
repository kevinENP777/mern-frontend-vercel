import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";

import { AdminContext } from "../context/AdminProvider";
import { useContext } from 'react'


const Tarea = ({ tarea }) => {
    const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
    const { descripcion, nombre, prioridad, fechaEntrega, estado } = tarea;

    
    const handleEnviar = () => {
        console.log("Enviando tarea a Admin:", tarea);
       
    };

    const { enviarTarea } = useContext(AdminContext)


    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            </div>
            <div className="flex gap-2">
               <div className="flex gap-2">
                        <button
                            className="bg-[#36681d] hover:bg-[#203c12] text-white font-bold py-2 px-4 text-sm rounded-lg transition-colors"
                            onClick={() => handleModalEditarTarea(tarea)}
                        >
                            EDITAR
                        </button>

                        {estado ? (
                            <button className="bg-sky-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg">
                                COMPLETA
                            </button>
                        ) : (
                            <button 
                                className="bg-[#39A900] hover:bg-[#2F8A00] text-white font-bold py-2 px-4 text-sm rounded-lg transition-colors"
                                onClick={() => {
                                    console.log("Enviando tarea a Admin:", tarea);
                                    enviarTarea(tarea);
                                    alert("Enviado con éxito");
                                }}
                            >
                                ENVIAR
                            </button>
                        )}

                        <button
                            className="bg-red-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={() => handleModalEliminarTarea(tarea)}
                        >
                            ELIMINAR
                        </button>
                    </div>

            </div>
        </div>
    );
};

export default Tarea;
