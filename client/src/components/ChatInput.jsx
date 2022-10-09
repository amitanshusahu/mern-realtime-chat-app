import styled from "styled-components";
import { useState } from "react";

export default function ChatInput({handelSendMsg}){
    const [msg , setMsg] = useState();
    const sendChat = (e) =>{
        e.preventDefault();
        if(msg.length > 0) {
            handelSendMsg(msg);
            setMsg('')
        }
    }
    return(
        <StyledContainer>
            <form className="input-holder" onSubmit={(e) => sendChat(e)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">Send</button>
            </form>
        </StyledContainer>
    )
}
const StyledContainer = styled.div`
    background-color: #0091ff;
    padding: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
    form{
        display: grid;
        grid-template-columns: 90% 10%;
        input{
            padding: 10px;
        }
    }
`