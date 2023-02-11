import PropTypes from "prop-types";

import { GifGridItem } from "./";
import { useFetchGifs } from "../hooks/useFetchGifs";

export const GifGrid = ( { category } ) => {

  const { images, isLoading } = useFetchGifs( category );
  
  return (
    <>
        <h3>{ category }</h3>
        {
          isLoading && ( <h2>Cargando...</h2> )
        }
        

        <div className="card-grid">
          {
            images.map( ( image ) => (
              <GifGridItem key={ image.id } { ...image } ></GifGridItem>
            ))
          }
        </div>
    </>
  )
}

GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
}
