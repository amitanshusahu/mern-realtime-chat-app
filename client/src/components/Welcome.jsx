import styled from "styled-components";

export default function Welcome({currentuser}){
    return(
        <StyledContaier>
            <h1>hi {currentuser.username}</h1>
        </StyledContaier>
    )
}
const StyledContaier = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0,0,0,0.1);
`
