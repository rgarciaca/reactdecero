import { heroes }  from '../';

export const getHeroesByName = ( searchText = '' ) => {
    
    searchText = searchText.toLocaleLowerCase().trim();
    
    if ( searchText.length === 0 ) return [];

    return heroes.filter( heroe => heroe.superhero.toLocaleLowerCase().includes( searchText ) );
}