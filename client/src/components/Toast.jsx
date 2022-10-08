import styled from "styled-components";

export default function Toast({message}){
    return(
        <StyledToast>
            <div className="message">
                {message}
            </div>
        </StyledToast>
    )
}

const StyledToast = styled.div`
    z-index: 100;
    position: absolute;
    bottom : 20px;
    right: 20px;
    .message{
        color: red;
    }
`