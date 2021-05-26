import React from 'react'
import { Media } from 'react-bootstrap';
import style from './Movie.module.css';
import styled from 'styled-components'

const StyledMedia = styled(Media)`
    cursor: pointer;
    border: 0.2px solid rgb(211, 202, 202);
    margin: 1px 1px 15px 1px;
    width: 24%;
    height: 420px;
    background-color: #6f5e49;

    &:hover {
        background-color: rgb(119, 119, 94);
    }
`

const StyledParagraph = styled.div`
    font-size: 0.7em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`


const Movie = ({movie, onClick})=> {
    return (
        <StyledMedia onClick={()=>{
                onClick(movie.id)
            }}>
            <img
                width="100%"
                height="80%"
                src={movie.posterurl}
                alt="Movie poster"
            />
            <Media.Body className={style.mediaBody}>
                <h5>{movie.title}</h5>
                <StyledParagraph>
                    {movie.storyline}
                </StyledParagraph>
            </Media.Body>
        </StyledMedia>
    )
}

export default Movie;