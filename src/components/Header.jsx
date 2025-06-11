import { Link } from "react-router-dom"
  const navigate = useNavigate();


const Header = () => {
  navigate('/'); // cerrar sesión y redirigir a la página de inicio
  return (
    <header
      className='px-4 py-5 bg-white shadow-md border-b border-green-600'
      style={{
        backgroundImage: `url("/fondo3.png")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className='md:flex md:justify-between md:items-center'>
        
      <Link
          to='/proyectos'
          className='text-base text-black transition-colors uppercase font-semibold'
        >
          Financiación de Emprendimientos | <span className='text-[#1C7B3E]'>SENA</span>
        </Link>

        <input
          type='search'
          placeholder='Buscar Emprendimientos del SENA...'
          className='rounded-lg lg:w-96 p-1 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4 md:mt-0'
        />

        <div className='flex items-center gap-3 mt-4 md:mt-0'>


         <Link
          to='/proyectos'
          className='text-sm text-black transition-colors uppercase font-semibold'
        >
          Financiar Iniciativas Empresariales | <span className='text-[#1C7B3E]'>SENA</span>
        </Link>


         <button
            type='button'
            onClick={handleLogout}
            className='text-white text-sm bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md uppercase font-bold transition-colors shadow'
          >
            Cerrar Sesión
          </button>

        </div>
      </div>
    </header>
  )
}

export default Header
