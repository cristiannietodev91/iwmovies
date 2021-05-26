import React, { useEffect } from 'react'
import { Media } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams
} from "react-router-dom";
import {
  getMovieById,
  selectMovieDetail
} from '../features/movies/moviesSlice';
import Loader from '../components/Utils/Loader.jsx'

const MovieDetailPage = () => {
  let { idmovie } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieById(idmovie))
  }, [dispatch, idmovie])

  const movieSelected = useSelector(selectMovieDetail)

  return (
    !movieSelected ? <Loader />
      :
      
      <Media className="d-flex flex-row m-3">
        <img
          width={250}
          height={350}
          src={movieSelected.posterurl}
          alt="Generic placeholder"
        />
        <Media.Body className="w-75 m-4">
          <h5>{movieSelected.title}</h5>
          <p>
            {movieSelected.storyline}
          </p>

        </Media.Body>
      </Media>
      
  )
}

export default MovieDetailPage;