import { useState, useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import PreviewProyecto from "../components/PreviewProyecto";

const Proyectos = () => {
  const { proyectos, busqueda } = useProyectos();
  const { auth } = useAuth(); // ← Aqui el ID del usuario autenticado por el hook de auth

  const [proyectosFiltrados, setProyectosFiltrados] = useState([]);

  useEffect(() => {
    if (!auth._id) return;

    const filtrados = proyectos.filter(proyecto =>
      proyecto.creador === auth._id &&
      proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    setProyectosFiltrados(filtrados);
  }, [busqueda, proyectos, auth._id]);

  return (
    <>
      <h1 className='text-4xl font-black text-green-600'>SENA Crea Nuevos Emprendimientos</h1>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectosFiltrados.length ? 
          proyectosFiltrados.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id} 
              proyecto={proyecto}
            />
          ))
        : <p className='text-center text-green-600 uppercase p-5'>
            No hay Ideas de Negocio para Mostrar
          </p>}
      </div>
    </>
  );
};

export default Proyectos;
