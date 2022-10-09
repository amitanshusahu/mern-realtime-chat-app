import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import Toast from "../components/Toast";
import axios from "axios"
import { registerRoute } from "../utils/APIroutes";

export default function Register(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("nistinder-user")){
            navigate("/")
        }
    }, [])
    const [values , setValues] = useState({
        username : "",
        email : "",
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
            const {username , email , password} = values;
            const postData ={ username, email, password };
            await axios.post(registerRoute, postData)
            .then((res)=>{
                if(res.data.status === false){
                    toast(res.data.msg);
                }
                if(res.data.status === true ){
                    let stringJsonData = JSON.stringify(res.data.userobj)
                    localStorage.setItem("nistinder-user" , stringJsonData)
                    navigate('/')
                }
            })
            .catch((err)=>{
                console.log(`this err is from axios${err}`)
            });
        }
        
    }
    const handelValidations = () => {
        const {username , email , password} = values;
        if(username.length < 3){
            toast("username length should be more than 3");
            return false
        }
        if(password.length < 3){
            toast("pasword length should be more than 8");
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
                        <h1>SignUp</h1>
                    </div>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    onChange={(e) => handelChange(e)}
                    />
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    onChange={(e) => handelChange(e)}
                    />
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={(e) => handelChange(e)}
                    />
                    <button type="submit">Create a accout</button>
                    <div className="login">
                        <Link to="/login">Already have an accout ?</Link>
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