const Alerta = ({ alerta, pruebas }) => {
  if (!alerta || !alerta.msg) return null;

  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 
    'from-green-500 to-green-700'} bg-gradient-to-br text-center p-3 rounded-xl 
    uppercase text-white font-bold text-sm my-10`}>
      {alerta.msg}
    </div>
  );
}
