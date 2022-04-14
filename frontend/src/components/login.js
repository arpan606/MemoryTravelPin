
import { useState , useEffect,useRef } from 'react';
import {Room,Star,Cancel} from "@material-ui/icons";
import axios from "axios";
import "./login.css";

export default function Login({setLogin,myStorage,setCurrentUser}){

const [error,setError]=useState('');
const nameRef=useRef();
const passwordRef=useRef();

const handleSubmit= async (e)=>{
e.preventDefault();
const user = {
  email:nameRef.current.value,
  password:passwordRef.current.value,
};


try{
  const res=await axios.post("http://localhost:8000/users/login",user)

 if(res.data.status)
 {
   setCurrentUser(res.data._id);
   setError(res.data.message);
   setLogin(false);
 }else if(!res.data.status){
   setError(res.data.message);
 }

}catch(err){

  setError('Please try Again');
}

}
  return(
    <div className="loginContainer">
        <div className="logo">
         <Room/>
         pins
        </div>
        <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" ref={nameRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
            <button type="submit" className="login_button">Login</button>
          { error  &&  <span className="not_success">{error}</span> }
        </form>
        <Cancel className="login_cancel" onClick={()=>setLogin(false)}/>
    </div>
  )
}
