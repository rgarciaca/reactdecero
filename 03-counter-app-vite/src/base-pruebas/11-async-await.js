export const getImagen = async() => {

    try {

        const apiKey = 'pPa9VH7Kqc8SOCAvp5fZKoSDIe3zSJ7A';
        const resp   = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${ apiKey }`);
        const { data } = await resp.json(); 

        const { url } = data.images.original;

        return url;

    } catch (error) {
        // manejo del error
        //console.error(error);
        return 'No se encontro la imagen';
    }
    
    
    
}

 getImagen();



