import styled from "styled-components";

export default function Welcome({currentuser}){
    return(
        <div>hi {currentuser.username}</div>
    )
}