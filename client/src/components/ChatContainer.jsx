import styled from "styled-components";
import img from "../asset/profile";
import { useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute, getMessageRoute } from "../utils/APIroutes";
import axios from "axios";
import { useEffect, useState , useRef } from "react";
import { v4 as uuidv4} from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if(currentChat){
        async function fetchMessages() {
            const responce = await axios.post(getMessageRoute, {
              from: currentUser._id,
              to: currentChat._id,
            });
            setMessages(responce.data);
          }
          fetchMessages();
    }
  }, [currentChat]);

  const handelSendMsg = async (e) => {
    await axios
      .post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: e,
      })
      .then((e) => {
        console.log(e.data.msg);
      });
      socket.current.emit("send-msg" , {
        to : currentChat._id,
        from : currentUser._id,
        messages: e,
      })

      const msgs = [...messages];
      msgs.push({fromSelf  :true , message: e});
      setMessages(msgs);
    
  };

  const [arrivalMessage , setArrivalMessage] = useState();
  useEffect(() => {
    if(socket.current){
        socket.current.on("msg-recieve" , (msg) =>{
            setArrivalMessage({fromSelf  : false , message : msg});
        });
    }
  }, []);

  useEffect(()=>{
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage]);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <StyledContainer>
      <div className="chat-header">
        <div className="user-details">
          <img src={img} alt="" />
          <h3>{currentChat.username}</h3>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Log out
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => {
          return (
            <div ref={scrollRef} key={uuidv4()} className={`message  ${msg.fromSelf ? "sended" : "recevied"}`}>
              <p className="message-text">{msg.message}</p>
            </div>
          );
        })}
      </div>

      <ChatInput handelSendMsg={handelSendMsg} />
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  position: relative;
  height: 100vh;
  .chat-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 15vh;
    background-color: #0091ff;
    button {
      height: fit-content;
      padding: 5px;
      margin: 20px;
      border: none;
      background-color: white;
    }
    .user-details {
      height: inherit;
      overflow: hidden;
      display: flex;
      /* justify-content: center; */
      align-items: center;
      padding: 20px;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .chat-messages {
    background-color: transparent;
    width: 100%;
    height: 70%;
    overflow-y: scroll;
    .message {
      display: flex;
      width: 100%;
      .message-text {
        padding: 10px;
        margin: 10px;
        margin-bottom: 0;
      }
    }
    .sended {
      justify-content: flex-end;
      .message-text {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #0091ff;
        color: white;
      }
    }
    .recevied {
      justify-content: flex-start;
      .message-text {
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #d3ecff;
        color: black;
      }
    }
  }
`;
