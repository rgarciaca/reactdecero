// Funciones es JS
const saludar = function (nombre) {
  return `saludar -> Hola, ${nombre}`;
};

console.log(saludar("Goku"));

const saludar2 = (nombre) => {
  return `saludar2 -> Hola, ${nombre}`;
};

console.log(saludar2("Vegeta"));

const getUser = () => {
  return {
    uid: "ABC123",
    username: " El_Papi1502",
  };
};

console.log(getUser());

// Tarea
const usuarioActivo = (nombre) => {
  return {
    uid: "ABC567",
    username: nombre,
  };
};

console.log(usuarioActivo("Roberto"));
