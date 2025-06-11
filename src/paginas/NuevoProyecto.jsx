import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black text-black text-center mb-6">Crear Nueva Idea de Negocio</h1>

      <div className="mt-10 flex justify-center p-6 bg-[#006e3a] rounded-lg shadow-lg">
        <div className="w-full max-w-2xl bg-white p-6 rounded-md shadow-md">
          <FormularioProyecto />
        </div>
      </div>
    </>
  )
}

export default NuevoProyecto
