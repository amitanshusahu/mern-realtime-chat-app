import styled from "styled-components"
import { useState , useEffect } from 'react';
import axios from "axios";

export default function Chat(){
    return(
        <StyledContainer>
            <div>Allcontacts</div>
            <div>All cats</div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 25% 75%;
`