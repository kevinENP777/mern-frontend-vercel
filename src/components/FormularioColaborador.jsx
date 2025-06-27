import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth'; //  nuevo import
import Alerta from './Alerta';

const FormularioColaborador = () => {
  const [email, setEmail] = useState('');
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
  const { auth } = useAuth(); //  obtener el email del usuario logueado

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      });
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      mostrarAlerta({
        msg: 'El email está mal escrito',
        error: true
      });
      return;
    }

    // Validación para que no se agregue a sí mismo
    if (email === auth.email) {
      mostrarAlerta({
        msg: 'No puedes añadir tu propio correo como colaborador',
        error: true
      });
      return;
    }
// fin de la validación

    // Llamada a la función para buscar al colaborador

    const resultado = await submitColaborador(email);

    if (!resultado || resultado.error) {
      mostrarAlerta({
        msg: 'Colaborador no encontrado',
        error: true
      });
      return;
    }
  };

  const { msg } = alerta;

  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className='mb-5'>
        <label
          className='text-gray-700 font-bold text-sm'
          htmlFor='email'
        >
          Email Colaborador
        </label>
        <input
          type='email'
          id='email'
          placeholder='Email del colaborador'
          className='border w-full p-2 placeholder-gray-400 rounded-md'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className='bg-[#1C7B3E] hover:bg-[#155f30] w-full p-3 text-white uppercase text-sm font-bold cursor-pointer transition-colors rounded'
        value='Buscar Colaborador'
      />
    </form>
  );
};

export default FormularioColaborador;
