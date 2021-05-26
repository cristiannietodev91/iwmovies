import React, {useState} from 'react'
import { Container, Button, FormControl, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Movies from '../features/movies/Movies.jsx'
import {
    filterMoviesByName,
    selectQuerySearchMovie
} from '../features/movies/moviesSlice';
import styled from 'styled-components'

const StyledHomeContainer = styled(Container)`
    display: flex;
    flex-direction: column;    
    position: relative;
`

const StyledFormContainer = styled(Container)`
   margin-bottom: 15px;
`

const Home = () => {
    const queryMovieName = useSelector(selectQuerySearchMovie)
    const [movieName, setMovieName] = useState(queryMovieName)
    const [genre, setGenre] = useState("")
    
    const dispatch = useDispatch();

    const searchMovie = ()=>{
        dispatch(filterMoviesByName(movieName,genre))
    }

    return (
        <StyledHomeContainer>
            <StyledFormContainer>
                <Container className="d-flex flex-row">
                    <Container>
                        <label htmlFor="movievalue">Search your favorite movie</label>
                        <FormControl id="movievalue" aria-describedby="basic-addon3" type="text" value={movieName} onChange={(e)=>{
                                setMovieName(e.target.value)
                            }} onKeyPress={event => {
                                if (event.key === "Enter") {
                                    searchMovie();
                                }
                            }}/>
                    </Container>
                    <Dropdown className="w-25 mt-4" onSelect={(eventKey)=>{
                        setGenre(eventKey)
                    }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Genres
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="Comedy">Comedy</Dropdown.Item>
                            <Dropdown.Item eventKey="Crime">Crime</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>    
                </Container>
                {/* <Container fluid>
                    <Form.Control type="range" value={range} min="0" max="10" onChange={(e)=>{
                        setRange(e.target.value)
                    }}/>
                </Container> */}
                <Button variant="primary" className="mt-3" onClick={()=>{
                        searchMovie();
                    }}>Search movie</Button>{' '}   
            </StyledFormContainer>    
            <Movies></Movies>            
        </StyledHomeContainer>
    )
}

export default Home;