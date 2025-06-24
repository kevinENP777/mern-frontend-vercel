import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"


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

        const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, { email }, config);
        setColaborador(data)
        setAlerta({})
        return data  // <-- ESTO FALTABA
    } catch (error) {
        setAlerta({
            msg: error.response?.data?.msg || 'Error al buscar colaborador',
            error: true
        })
        return { error: true }  // <-- EVITA QUE SE QUEDE PEGADO
    } finally {
        setCargando(false)
    }
}
