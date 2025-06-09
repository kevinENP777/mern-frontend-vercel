// pages/Admin.jsx
import { useContext } from 'react';
import { AdminContext } from "../context/AdminProvider.jsx";

const Admin = () => {
  const { tareasAdmin } = useContext(AdminContext);

  const handleAceptar = (nombre) => {
    alert(`Emprendimiento "${nombre}" aceptado`);
  };

  const handleRechazar = (nombre) => {
    alert(`Emprendimiento "${nombre}" rechazado`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
        🛠️ Panel de Administración
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        📋 Emprendimientos por Analisar
      </h2>

      {tareasAdmin.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No hay tareas todavía.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {tareasAdmin.map((tarea, index) => (
            <div
              key={tarea._id || index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-3">
                  {tarea.nombre}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">📝 Descripción:</span> {tarea.descripcion}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">📌 Estado:</span> {tarea.estado ? '✅ Completado' : '⌛ Pendiente'}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">📅 Fecha de entrega:</span> {new Date(tarea.fechaEntrega).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-4">
               <button
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1 text-sm rounded-md transition"
                    onClick={() => handleAceptar(tarea.nombre)}
                  >
                    ✅ Aceptar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 text-sm rounded-md transition"
                    onClick={() => handleRechazar(tarea.nombre)}
                  >
                    ❌ Rechazar
                  </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
