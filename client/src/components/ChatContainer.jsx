import styled from "styled-components";
import img from "../asset/profile"
import { useNavigate } from 'react-router-dom';
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatContainer({currentChat}){
    const navigate = useNavigate();

    const handelSendMsg = (e) =>{
        alert(e)
    }
    return(
        <StyledContainer>
            <div className="chat-header">
                <div className="user-details">
                    <img src={img} alt="" />
                    <h3>{currentChat.username}</h3>
                </div>
                <button onClick={()=>
                    {
                        localStorage.clear();
                        navigate("/login");
                    }}
                >Log out</button>
            </div>

            <Messages />

            <ChatInput handelSendMsg = {handelSendMsg}/>
        </StyledContainer>
    )
}
const StyledContainer = styled.div`
    position: relative;
    height: 100vh;
    .chat-header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        height: 15vh;
        background-color: #0091ff;
        button{
            height: fit-content;
            padding: 5px;
            margin: 20px;
            border: none;
            background-color: white;
        }
        .user-details{
            height: inherit;
            overflow: hidden;
            display: flex;
            /* justify-content: center; */
            align-items: center;
            padding: 20px;
            img{
                height: 50px;
                width: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
`