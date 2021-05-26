import React from 'react'
import { Container } from 'react-bootstrap';
import Movie from './Movie.jsx';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

const StyledContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
`


const ListMovies = ({listMovies}) =>{
    let history = useHistory();

    const onMovieClick = (idMovie) =>{
        history.push(`/movie/${idMovie}`)
    }

    return (
        <StyledContainer>
            {listMovies && listMovies.map(movie =>{
                return (
                    <Movie movie={movie} key={movie.id} onClick={onMovieClick}>
                    </Movie>
                )
            })}
        </StyledContainer>
    )
}

export default ListMovies;