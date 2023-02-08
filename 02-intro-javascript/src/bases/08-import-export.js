import { heroes, owners } from "../data/heroes";

export const getHeroeById = (id) => {
  return heroes.find((heroe) => heroe.id === id);
};

export const getHeroesByOwner = (owner) => {
  return heroes.filter((heroe) => heroe.owner === owner);
};

// console.log(heroes);
// console.log(getHeroeById(3));
// console.log(getHeroesByOwner("DC"));
// console.log(owners);
