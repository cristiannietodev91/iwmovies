import React from 'react'
import { Container ,Row } from 'react-bootstrap';
import styled from 'styled-components'

const StyledContainer = styled(Container)`
    height: 55px;
    padding: 5px;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const StyledRow = styled(Row)`
    color: #126282;
    font-size: 2em;
    margin-left: 25px;
    letter-spacing: 3px;
    line-height: 1.2;
`

const Header = ()=>{
    return (
        <StyledContainer>
            <img
                width={64}
                height={64}
                src="https://www.incredible-web.com/img/logo.png"
                alt="logo IW search"
            />
            <StyledRow>
                IW Movies Search
            </StyledRow>
        </StyledContainer>
    )
}

export default Header;