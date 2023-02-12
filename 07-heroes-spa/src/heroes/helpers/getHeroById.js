import { heroes }  from '../';

export const getHeroById = ( id ) => {


    return heroes.find( hero => hero.id === id );
}