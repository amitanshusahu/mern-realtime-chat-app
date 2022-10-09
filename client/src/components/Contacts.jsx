import styled from "styled-components";
import { useState, useEffect } from "react";
import img from "../asset/profile"
export default function Contacts({ contacts, currentuser, changeChat }) {
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  useEffect(() => {
    if (currentuser) {
      setcurrentUserName(currentuser.username);
    }
  }, [currentuser]);

  const changeCurrentChat = (index , contact) =>{
    setCurrentSelectedChat(index);
    changeChat(contact)
  }

  return (
    <>
      {currentUserName && (
        <StyledContacts>
          <div className="heading flex-center">
                <h2>MERN Chat app</h2>
                <p>{currentUserName}</p>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelectedChat ? "selected" : " "
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <img src={img} alt="image" />
                  <div className="username">
                    <p>{contact.username}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </StyledContacts>
      )}
    </>
  );
}

const StyledContacts = styled.div`
    position: relative;
    overflow: hidden;
    .heading{
        background-color: #0091ff;
        height: 15vh;
        border-right: 2px solid white;
        flex-direction: column;
        color: white;
        align-items: flex-start;
        padding: 20px;
    }
    .contacts{
        overflow-x:hidden;
        overflow-y: scroll;
        height: 85vh;
    }
    .contact{
        display: flex;
        padding: 20px;
        border: 1px solid white;
        background-color: #ffffff;
        align-items: center;
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
    }
    .selected{
        background-color: #bdecec;
    }
`;
