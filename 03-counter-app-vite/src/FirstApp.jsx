import PropTypes from "prop-types";

const newMessage = "Roberto Garcia";
const objeto = {
  message: "Hola Mundo",
  titulo: "Esto es un tipo de saludo",
};

const getSaludo = () => {
  return `Hola ${ newMessage }, ¿que tal estas?`;
};

export const FirstApp = ({ title, subtitle }) => {
  if (!title) throw new Error("El title no ha sido configurado.");

  return (
    <>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <code>{JSON.stringify(objeto)}</code>
    </>
  );
};

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

FirstApp.defaultProps = {
  title: "Sin título",
  subtitle: "Sin subtítulo",
};
