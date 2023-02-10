import { getHeroeByIdAsync } from "../../src/base-pruebas/09-promesas";

describe('Pruebas en 09-promesas', () => {

    test('getHeroeByIdAsync debe retornar un heroe', (done) => {

        const id = 2;
        getHeroeByIdAsync( id )
            .then( heroe => {

                expect(heroe).toEqual({
                    id: 2,
                    name: 'Spiderman',
                    owner: 'Marvel'
                });
                
                done();
            })

    });

        test('getHeroeByIdAsync debe obtener un error si no existe', (done) => {

        const id = 100;
        getHeroeByIdAsync( id )
            .catch(error => {

                expect(error).toBe('No se pudo encontrar el héroe' + id)

                done();
            })

    });

});