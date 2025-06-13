import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black text-black text-center mb-6">
        Crear Nueva Idea de Negocio
      </h1>

      <div className="w-full flex justify-center">
        <div className="mt-10 p-6 bg-[#ffffff] rounded-lg shadow-lg w-full max-w-2xl">
          <FormularioProyecto />
        </div>
      </div>
    </>
  )
}

export default NuevoProyecto
