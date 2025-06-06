import { Link } from "react-router-dom"

const PreviewProyecto = ({proyecto}) => {
    const { nombre, _id, cliente } = proyecto
    return (
        <div className='border-b p-5 flex'>
            <p className='flex-1'>
                {nombre} 

                <span className='text-sm  text-gray-500 uppercase'>{' '}
                {cliente}</span>
            </p>

        <Link 
                to={`${_id}`}
                className="text-[#1C7B3E] hover:text-[#1C7B3E] uppercase text-sm font-bold"
            >
                Ver Emprendimiento
            </Link>

        </div>
    )
}

export default PreviewProyecto
