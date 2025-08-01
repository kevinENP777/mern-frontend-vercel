import { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams, useNavigate } from "react-router-dom";

const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    mostrarAlerta
  } = useProyectos();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const handleAgregar = () => {
    agregarColaborador({ email: colaborador.email });

    mostrarAlerta({
      msg: "Colaborador añadido correctamente",
      error: false,
    });

    // Guardar solo para este proyecto
    const claveStorage = `colaboradores_${params.id}`;
    const guardados = JSON.parse(localStorage.getItem(claveStorage)) || [];

    if (!guardados.includes(colaborador.email)) {
      guardados.push(colaborador.email);
      localStorage.setItem(claveStorage, JSON.stringify(guardados));
    }

    setTimeout(() => {
      navigate(`/proyectos/${params.id}`);
    }, 2000);
  };

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>

                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
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
  );
};

export default NuevoColaborador;
