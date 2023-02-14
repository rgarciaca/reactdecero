import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';

import { HeroCard, HeroList } from "../components";
import { useForm } from "../hooks/UseForm";
import { getHeroesByName } from "../helpers";
import { useMemo } from "react";

export const SearchPage = (e) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search)

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const heroes = useMemo( () => getHeroesByName( q ), [ q ] );

  const onSearchSubmit = (e) => {

    e.preventDefault();
    
    navigate(`?q=${ searchText }`);
  }

  const showSearchAlert = ( q.length === 0 );
  const showErrorAlert = ( q.length > 0 && heroes.length === 0 );

  return (
    <>
      <h1>Search</h1>
      <hr/>

      <div className="row">
        <div className="col-5">
          <h4>Searching...</h4>
          <hr/>
          <form aria-label="form" onSubmit={ onSearchSubmit } >
            <input type="text" placeholder="Search a hero" className="form-control" name="searchText" autoComplete="off" value={ searchText } onChange={ onInputChange }/>
            <button type="submit" className="btn btn-outline-primary mt-1" >Search</button>
          </form>

        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr/>

          {
            showSearchAlert && <div className="alert alert-primary animate__animated animate__bounce">Search a hero</div>
          }
          {
            showErrorAlert && <div aria-label="alert-danger" className="alert alert-danger animate__animated animate__bounce">No hero with <b>{ q }</b></div>
          }

          {
            heroes.map(hero => (
                <HeroCard key={ hero.id } hero={ hero }></HeroCard> 
            ))
          }
        </div>
      </div>
    </>
  )
}
