import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";

describe('Pruebas en 08-imp-exp', () => {

    test('getHeroeById debe retornar un heroe por su ID', () => {

        const id = 3;

        const heroe = getHeroeById(id);

        expect(heroe).toEqual({
            id: 3,
            name: 'Superman',
            owner: 'DC'
        });


    });

    test('getHeroeById debe retornar undefined si no existe', () => {

        const id = 100;

        const heroe = getHeroeById(id);

        expect(heroe).toBeFalsy();

        
    });

    test('getHeroesByOwner debe retornar tres heroes de DC', () => {

        const ret = getHeroesByOwner('DC');

        expect(ret.length).toBe(3);
        expect(ret).toEqual(heroes.filter((heroe) => heroe.owner === 'DC'));

    });

    test('getHeroesByOwner debe retornar tres heroes de Marvel', () => {

        const ret = getHeroesByOwner('Marvel');

        expect(ret.length).toBe(2);
        expect(ret).toEqual(heroes.filter((heroe) => heroe.owner === 'Marvel'));

    });
});