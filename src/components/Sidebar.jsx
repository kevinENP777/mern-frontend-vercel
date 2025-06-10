import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
  const { auth } = useAuth()
  console.log(auth)

  return (
    <aside className='md:w-80 lg:w-96 px-6 py-10 bg-white shadow-md rounded-lg'>
      <p className='text-xl font-bold text-[#006e3a] mb-6'>Bienvenido : {auth.nombre}</p>

      <Link
        to='crear-proyecto'
        className='bg-[#006e3a] hover:bg-[#00562f] transition-colors duration-300 w-full p-4 text-white uppercase font-semibold block text-center rounded-xl shadow'
      >
      Nueva idea de negocio
      </Link>
    </aside>
  )
}

export default Sidebar
