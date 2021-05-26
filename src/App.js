import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import MovieDetail from "../src/pages/MovieDetail.jsx";
import About from '../src/pages/About.jsx';
import Header from './components/layout/Header.jsx'

import styled from 'styled-components'

const StyledContainer = styled.div`
  background: #8E8D8E;
  color: #ecf2f5;
`

function App() {
  return (
    <StyledContainer>
      <Header></Header>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/movie/:idmovie">
          <MovieDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </StyledContainer>
  );
}

export default App;
