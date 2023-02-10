import { persona, usContext } from "../../src/base-pruebas/06-deses-obj";

describe("Pruebas en 06-deses-obj", () => {

    test('usContext debe retornar un objeto', () => {
        
        const testPersona = {
            nombreClave: 'Ironman',
            anios: 45,
            latlng: {
                lat: 14.1232,
                lng: -12.3232
            }
        };

        const personaRet = usContext(persona);

        expect(personaRet).toEqual(testPersona);
    });

});