const personajes = ["Goku", "Vegeta", "Trunks"];
const [p1, , p3] = personajes;

console.log(p1, p3);

const retornaArreglo = () => {
  return ["ABC", 123];
};

const [letras, numeros] = retornaArreglo();
console.log(letras, numeros);

const useState1 = (valor) => {
  return [
    valor,
    () => {
      console.log("Hola Mundo");
    },
  ];
};

const arr = useState1("Goku");
console.log(arr);
