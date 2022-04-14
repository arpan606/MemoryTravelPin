import "./register.css";
import { useState , useEffect,useRef } from 'react';
import {Room,Star,Cancel} from "@material-ui/icons";
import axios from "axios";


export default function Register(props){

const [alert,setAlert]=useState('');

const nameRef=useRef();
const emailRef=useRef();
const passwordRef=useRef();


const handleSubmit= async (e)=>{
e.preventDefault();
const newUser = {
  username:nameRef.current.value,
  email:emailRef.current.value,
  password:passwordRef.current.value,
};

try{
  const res=await axios.post("http://localhost:8000/users/register",newUser);
  setAlert(res.data.message);

  if(res.data.status){
    props.setCurrentUser(res.data._id);
    props.setRegister(false);
  }

}catch(err){
props.setRegister(false);
}


}


  return(
    <div className="registerContainer">
        <div className="logo">
         <Room/>
         pins
        </div>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef}/>
          <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
            <button type="submit" className="register_button">Register</button>
           { alert &&  <span className="not_success">{alert}</span> }

        </form>
        <Cancel className="register_cancel" onClick={()=>props.setRegister(false)}/>
    </div>
  )
}
