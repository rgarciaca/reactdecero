const activo = true;

let mensaje = "";

if (activo) {
  mensaje = "Activo";
} else {
  mensaje = "Inactivo";
}

console.log(mensaje);

const mensaje2 = activo ? "Activo 2" : "Inactivo 2";
console.log(mensaje2);
