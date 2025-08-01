import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";


const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [busqueda, setBusqueda] = useState(''); //  nuevo estado para busqueda
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [ tarea, setTarea] = useState({})
    const [ modalELiminarTarea, setModalEliminarTarea] = useState(false)
    const [ colaborador, setColaborador] = useState({})

    const navigate = useNavigate()



    useEffect(() =>{
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios('/proyectos', config)
            setProyectos(data)

            // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    })
    
    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {  // codigo para mostrar la alerta por 5 segundos
            setAlerta({})
        }, 5000)
    }

    const submitProyecto = async proyecto =>{
        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
        return
        // if (proyecto.id) {
        //     await editarProyecto(proyecto)
        // } else {
        //     await nuevoProyecto(proyecto)
        // }
        // return
        
    }

    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            //Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            //Mostrar la alerta proyecto actualizado
            setAlerta({
                msg: 'Proyecto Actualizado correctamente',
                error: false
            })

                setTimeout(() =>{
                    setAlerta({})
                        navigate('/proyectos')
                },3000)
            //Redireccionar
        } catch (error) {
            console.log(error)
        }
    }
    
    const nuevoProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto creado correctamente',
                error: false
            })

                setTimeout(() =>{
                    setAlerta({})
                        navigate('/proyectos')
                },3000)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id =>{
        setCargando(true)
       try {
        const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
       } catch (error) {
        setAlerta({
            msg: error.response.data.msg,
            error: true
        })
       }finally{
            setCargando(false)
       }
    }

    const eliminarProyecto = async id =>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            //Sincronizar el State
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() =>{
                setAlerta({})
                    navigate('/proyectos')
            },3000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () =>{
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async tarea =>{
        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }

    }

    const crearTarea = async tarea =>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/tareas', tarea, config)
            // console.log(data)

            // Agregar la tarea al state
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas=[...proyecto.tareas, data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularioTarea(false)

        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async tarea =>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

            //TODO:ACTualizar en el DOM
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
                tareaState._id === data._id ? data : tareaState )
                setProyecto(proyectoActualizado)


            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = tarea =>{
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalELiminarTarea)
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
    
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config);
    
            setAlerta({
                msg: data.msg,
                error: false
            });
    
            const proyectoActualizado = { ...proyecto };
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
                tareaState => tareaState._id !== tarea._id
            );
    
            setProyecto(proyectoActualizado);
            setModalEliminarTarea(false);
            setTarea({});
            setTimeout(() => {
                setAlerta({});
            }, 3000)

        } catch (error) {
            console.log(error);
            // setAlerta({
            //     msg: 'Hubo un error al eliminar la tarea',
            //     error: true
            // });
        }
    };

    // const submitColaborador = async email => {
    //     setCargando(true)
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (!token) return;
    
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`
    //             }
    //         };
    //         const { data } = await clienteAxios.post('/proyectos/', { email }, config);
    //         setColaborador(data)
    //         setAlerta({})
    //     } catch (error) {
    //         setAlerta({
    //             msg: error.response.data.msg,
    //             error: true
    //         })
    //     }finally{
    //         setCargando(false)
    //     }
    // }

    // cambio de submitColaborador para que busque por proyecto
    
  const submitColaborador = async email => {
    setCargando(true)
    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        //  Esta es la ruta correcta para BUSCAR colaborador y agregarlo a proyecto
        const { data } = await clienteAxios.post(`/proyectos/colaboradores`, { email }, config);
        
        setColaborador(data)
        setAlerta({})
        return data
    } catch (error) {
        setAlerta({
            msg: error.response?.data?.msg || 'Error al buscar colaborador',
            error: true
        })
        return { error: true }
    } finally {
        setCargando(false)
    }
}

// fin de submitColaborador

   const agregarColaborador = async email => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    // ✅ Ruta correcta con endpoint bien definido
    const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, { email }, config)
  } catch (error) {
    console.log(error.response)
  }
}
// cambios hechos para que el provider retorne el contexto con los valores y funciones necesarias

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalELiminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                busqueda,          //  nuevo
                setBusqueda        //  nuevo
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}
export default ProyectosContext