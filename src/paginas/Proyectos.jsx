import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"

const Proyectos = () => {

  const { proyectos } = useProyectos()
  
  return (
    <>
      <h1 className='text-4xl font-black text-green-600'>SENA Crea nuevos Emprendiminetos</h1>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ? 
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id} 
              proyecto={proyecto}
            />
          ))
        : <p className='text-center text-green-600 uppercase p-5'>No hay ideas de negocio para mostrar</p>}
      </div>
    </>

    
  )
}


export default Proyectos