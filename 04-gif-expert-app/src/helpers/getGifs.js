  export const getGifs = async ( category ) => {

    const url=`https://api.giphy.com/v1/gifs/search?api_key=pPa9VH7Kqc8SOCAvp5fZKoSDIe3zSJ7A&limit=10&q=${ category }`;
    const resp = await fetch( url );
    const { data } = await resp.json();

    const gifs = data.map( img => ({
      id: img.id,
      title: img.title,
      url: img.images.fixed_width.url,
    }));

    return gifs;
  }