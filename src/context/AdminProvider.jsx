// src/context/AdminProvider.jsx


import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [tareasAdmin, setTareasAdmin] = useState([]);

  const enviarTarea = (tarea) => {
    console.log("Guardando tarea en contexto:", tarea);
    setTareasAdmin((prev) => [...prev, tarea]);
  };

  return (
    <AdminContext.Provider value={{ tareasAdmin, enviarTarea }}>
      {children}
    </AdminContext.Provider>
  );
};
// Este contexto permite al administrador recibir y gestionar las tareas enviadas por los usuarios.
// Proporciona una función para enviar tareas y un estado para almacenar las tareas recibidas.