export const fileUpload = async ( file ) => {
    if ( !file ) throw new error('No se ha especificado un archivo a subir');

    const cloudUrl = `https://api.cloudinary.com/v1_1/dttpszye6/upload`;

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal-rgc');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        } );

        if ( !resp.ok )  throw new error('no se puedo enviar la imagen');

        const cloudResp = await resp.json(); 
  
        return cloudResp.secure_url;

    } catch (error) {
        throw new ErrorEvent( error.message);
    }
}