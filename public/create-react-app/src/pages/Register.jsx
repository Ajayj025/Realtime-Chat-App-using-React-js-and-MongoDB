import React, { useState,useEffect } from 'react';
import { Link ,useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
function Register() {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme:"dark",
    };
     useEffect(()=>{
            if(localStorage.getItem('chat-app-user')){
                navigate('/')
            }
        },[]);
    const handleSubmit=async (event)=>{
        event.preventDefault();
        if(handleValidation()){
        const{password,username,email}=values;
        const{data}= await axios.post(registerRoute,{
            username,
            email,
            password,
        });
         if(data.status===false){
            toast.error(data.msg,toastOptions);
         }
         if(data.status===true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate("/");
         }
        }
    };

    const handleValidation=()=>{
        const{password,confirmPassword,username,email}=values;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const digitRegex = /\d/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const spaceRegex = /\s/;
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password are not Matching...",toastOptions);
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be greater than 3 Characters",toastOptions);
            return false;
        }
        else if(password.length<8){
            toast.error("Password should be greater than or equal to 8 Characters",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("email is required",toastOptions);
            return false;
        }
        else if (!specialCharRegex.test(password) || !digitRegex.test(password) || !uppercaseRegex.test(password) || !lowercaseRegex.test(password) || spaceRegex.test(password)) {
            toast.error("Password should contain at least one special character,one digit,one UppperCase letter,one LowerCase letter and no spaces are allowed.",toastOptions);
            return false;
        }
        return true;
    };

    const handleChange=(event)=> {
        setValues({...values,[event.target.name]: event.target.value});
    };
  return (
    <>
    <FormContainer>
        <form onSubmit={(event=>handleSubmit(event))}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>Welcome!</h1>
            </div>
            <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            />
            <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e)=> handleChange(e)}
            />
            <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            />
            <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>
                Already have an account?<Link to="/login">Login</Link>
            </span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items: center;
background-color: #20B2AA;
.brand{
display: flex;
align-items: center;
gap:1rem;
justify-center:column;
img{
   height: 5rem;
}
h1{
   color:white;
   text-transform: uppercase;
}
}
form{
display:flex;
flex-direction:column;
gap:2rem;
background-color: #00000076;
border-radius: 2rem;
padding: 3rem 5rem;
input{
 background-color: transparent;
 padding:1rem;
 border: 0.1rem solid #0000CD;
 border-radius: 0.4rem;
 color:white;
 width: 100%;
 font-size: 1rem;
 &:focus{
 border: 0.1rem solid #20B2AA;
 outline:none;
 }
}
button{
 background-color: #0000CD;
 color:white;
 padding: 1rem 2rem;
 border: none;
 font-weight: bold;
 cursor: pointer;
 border-radius: 0.4rem;
 font-size: 1rem;
 text-transform: uppercase;
 transition: 0.5s ease-in-out;
 &:hover{
  background-color: #20B2AA;
 }
}
span {
  color: white;
  text-transform: uppercase;
 a{
  color: #0000CD;
  text-decoration: none;
  font-weight: bold;
 }
}
}
`;
export default Register;