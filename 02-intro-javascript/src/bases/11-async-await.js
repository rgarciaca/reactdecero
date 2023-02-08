// const getImagenPromesa = () => {
//   const promesa = new Promise((resolve, reject) => {
//     resolve("https://aocsnwodvbwiuvb.com");
//   });

//   return promesa;
// };

// getImagenPromesa().then(console.log);

const apiKey = "pPa9VH7Kqc8SOCAvp5fZKoSDIe3zSJ7A";
const getImage = async () => {
  const resp = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
  );
  const data = await resp.json();
  console.log(data);
  return data;
};

getImage().then(({ data }) => {
  const { url } = data.images.original;
  const img = document.createElement("img");
  img.src = url;

  document.body.append(img);
});
