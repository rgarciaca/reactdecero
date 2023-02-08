// Desestructuracion
const persona = {
  nombre: "Tony",
  apellido: "Stark",
  edad: 45,
  clave: "Ironman",
};

console.log(persona.nombre);
console.log(persona.apellido);
console.log(persona.edad);
console.log(persona.clave);

const { nombre, apellido, edad, clave } = persona;

console.log(nombre);
console.log(apellido);
console.log(edad);
console.log(clave);

const retornaPersona = ({
  nombre,
  apellido,
  edad,
  clave,
  rango = "Capitán",
}) => {
  console.log("retornaPersona");
  console.log(nombre, apellido, edad, clave);

  return {
    nombreClave: clave,
    anios: edad,
  };
};

const { nombreClave, anios } = retornaPersona(persona);
console.log(nombreClave, anios);
