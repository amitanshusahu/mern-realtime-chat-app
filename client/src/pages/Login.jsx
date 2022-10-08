import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import axios from "axios"
import { loginRoute } from "../utils/APIroutes";

export default function Login(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("nistinder-user")){
            navigate("/")
        }
    }, [])
    const [values , setValues] = useState({
        username : "",
        password : ""
    });
    const [message , setMessage] = useState("");
    const toast = (arg) =>{
        setMessage(arg);
        console.log("toast working" + arg)
        setTimeout(()=>{
            setMessage("")
        },2000)
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if(handelValidations()){
            const {username , password} = values;
            const postData ={ username,password };
            await axios.post(loginRoute, postData)
            .then((res)=>{
                if(res.data.status === false){
                    toast(res.data.msg);
                }
                if(res.data.status === true ){
                    localStorage.setItem("nistinder-user" , res.data.userobj);
                    console.log(res);
                    navigate('/')
                }
            })
            .catch((err)=>{
                console.log(`this err is from axios${err}`)
            });
        }
        
    }
    const handelValidations = () => {
        const {username , password} = values;
        if(username.length == ""){
            toast("Username is required");
            return false
        }
        if(password.length == ""){
            toast("Password is required");
            return false
        }
        return true
    }
    const handelChange = (e) =>{
        console.log(e.target.value)
        setValues({...values , [e.target.name] : e.target.value })
    }
    return(
        <StyledForm>
            <Toast message={message} />
            <div className="form-holder">
                <form className="flex-center" onSubmit={(e) => handelSubmit(e)}>
                    <div className="heading">
                        <h1>Login</h1>
                    </div>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    onChange={(e) => handelChange(e)}
                    />
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={(e) => handelChange(e)}
                    />
                    <button type="submit">Login to app</button>
                    <div className="login">
                        <Link to="/register">Don't have an accout ?</Link>
                    </div>
                </form>
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.div`
    position: absolute;
    background-color: #9fc9ff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    .form-holder{
        padding: 30px;
        background-color: white;
        border-radius: 3px;
        form{
            flex-direction: column;
            input{
                padding: 10px;
                margin: 20px;
                border-radius: 3px;
                border: 1px solid grey;
            }
            button{
                padding: 10px;
                outline: none;
                border: none;
                margin-bottom: 20px;
                background-color: #004cff;
                color: white;
                font-weight: bold;
                border-radius: 3px;
            }
            .login{
                font-size: 14px;
            }
        }
    }
`