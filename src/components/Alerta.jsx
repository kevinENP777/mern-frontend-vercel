const Formulario = () => {
  const [accesorios, setAccesorios] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (accesorios.trim() === '') {
      setAlerta({ msg: 'Faltan los accesorios', error: true });
      return;
    }

    setAlerta({ msg: 'Formulario enviado correctamente', error: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={accesorios}
        onChange={(e) => setAccesorios(e.target.value)}
        placeholder="Ingresa accesorios"
      />
      <button type="submit">Enviar</button>

      {alerta.msg && <Alerta alerta={alerta} />}
    </form>
  );
};

export default Formulario;
