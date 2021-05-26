import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
    topMovies
  } from './moviesSlice';
import ListMovies from '../../components/movies/ListMovies.jsx';

const Movies = () => {
    const listTopMovies = useSelector(topMovies);
    
    return (
        <Container>
            <ListMovies listMovies={listTopMovies}></ListMovies>
        </Container>
    )
}

export default Movies;