import { fileUpload } from "../../helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dttpszye6',
    api_key: '711826756438334',
    api_secret: '5Yv6wvGNFp8O2o-lEjmOfppr-Dg',
    secure: true,

})

describe ('Prueba en fileUpload', () => {
    test('debe de subir el archivo correctamente a Cloudinary', async () => {
        const imageUrl = 'https://res.cloudinary.com/dttpszye6/image/upload/v1676757328/journal/g90mzqbssxjqukih3yci.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect ( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].split('.')[0];

        await cloudinary.api.delete_resources( [ 'journal/' + imageId ] );
    })

    test('debe retornar null', async () => {

        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect ( url ).toBe(null);
    })
})