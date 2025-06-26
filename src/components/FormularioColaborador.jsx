import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioColaborador = () => {
  const [email, setEmail] = useState('');
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
  const navigate = useNavigate();

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

    const resultado = await submitColaborador(email);

    if (!resultado || resultado.error) {
      mostrarAlerta({
        msg: 'Usuario no encontrado',
        error: true
      });
      return;
    }

    // ✅ Mostrar alerta
    mostrarAlerta({
      msg: 'Colaborador añadido correctamente',
      error: false
    });

    // ✅ Guardar en localStorage
    const guardados = JSON.parse(localStorage.getItem('colaboradores')) || [];
    guardados.push(email);
    localStorage.setItem('colaboradores', JSON.stringify(guardados));

    // ✅ Redirigir a la página anterior
    setTimeout(() => {
      navigate(-1); // vuelve a la página anterior
    }, 2000);
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
        value='Buscar Patrocinador'
      />
    </form>
  );
};

export default FormularioColaborador;
