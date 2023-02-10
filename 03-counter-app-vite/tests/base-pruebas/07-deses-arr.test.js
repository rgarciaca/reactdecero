import { retornaArreglo } from "../../src/base-pruebas/07-deses-arr";

describe('Pruebas en 07-deses-arr', () => {

    test('debe retornar un string y un número', () => {
    
        const [ letters, numbers ] = retornaArreglo();

        expect( letters ).toEqual( expect.any(String) );
        expect( numbers ).toEqual( expect.any(Number) );

        expect( typeof letters ).toBe( 'string' );
        expect( typeof numbers ).toBe( 'number' );
    });
});