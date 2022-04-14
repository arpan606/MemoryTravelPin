import { useState , useEffect } from 'react';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import {Room,Star} from "@material-ui/icons";
import axios from "axios";
import "./App.css"


import Register from "./components/register.js";
import Login from "./components/login.js";

function App() {

  const myStorage=window.localStorage;
   const [currentUser,setCurrentUser]=useState(null);

   const [currentPlaceId,setCurrentPlaceId]=useState(null);
   const [pins,setPins]=useState([]);
   const [newPlace,setNewPlace]=useState(null);

    const [title,setTitle]=useState(null);
    const [desc,setDesc]=useState(null);
    const [rating,setRating]=useState(0);

    const [register,setRegister]=useState(false);
    const [login,setLogin]=useState(false);

    const [warning,setWarning]=useState(false);
    const [instruction,setInstruction]=useState(true);

    const [viewport,setViewport]=useState({
     latitude:47.7577,
     longitude:12.4376,
     zoom:2,
     width:"100vw",
     height:"100vh"
    });



   useEffect(()=>{
     const getPins=async ()=>{
         try{
          console.log("hello");
           const allPins=await axios.get("http://localhost:8000/pins");
console.log(allPins);
           setPins(allPins.data);
         }catch(err){
           console.log(err);
         }
     };
   getPins();

 },[]);

const handleMarkerClick=(id,lat,longt)=>{
setCurrentPlaceId(id);
setViewport({...viewport,latitude:lat,longitude:longt});
 }

const handleAddClick=(e)=>{

 if(!currentUser)
  {
    setWarning(true);
    return;
  }

  const [long,lat]=e.lngLat;
  setNewPlace({
    lat,
    long,
  });


}

const handleSubmit = async (e)=>{
   e.preventDefault();

    const newPin= {
    username:currentUser,
    title,
    desc,
    rating,
    lat:newPlace.lat,
    longt:newPlace.long
  };

console.log(newPin);

  try{

    const res=await axios.post("http://localhost:8000/pins",{...newPin});
    setPins([...pins,res.data]);
    setNewPlace(null);

  }catch(err){
    console.log(err);
  }

}


  return (
    <div className="App">
     <ReactMapGL style={{width:"100%",height:"100%"}}
     {...viewport}

     onViewportChange={(nextViewport)=>setViewport(nextViewport)}
    
     onDblClick={handleAddClick}>
     {
       pins.map(p=>(
        <>
         <Marker
         latitude={p.lat}
         longitude={p.longt}
         offsetLeft={-viewport.zoom*3}
         offsetTop={-viewport.zoom*3}>
            <Room style={{fontSize:viewport.zoom*7,color:p.username==currentUser?"tomato":"slateblue"}} onClick={()=>handleMarkerClick(p._id,p.lat,p.longt)}/>
         </Marker>
         {  p._id === currentPlaceId &&
              <Popup
              latitude={p.lat}
              longitude={p.longt}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="right">
              <div className="card" >
                 <label>Place</label>
                 <h1>{p.title}</h1>
                  <label>Review</label>
                   <p className="desc">{p.desc}</p>
                   <label>Rating</label>
                   <div className="stars">
                   {Array(p.rating).fill(<Star className="star"/>)}
                    </div>
                    <label>Information</label>
                      <span className="time">time:</span>
              </div>
              </Popup>
            }
          </>

     ))}

     {/*new popup from user*/}
     { newPlace && (
     <Popup
     latitude={newPlace.lat}
     longitude={newPlace.long}
     closeButton={true}
     closeOnClick={false}
     onClose={() => setNewPlace(null)}
     anchor="right">
     <div>
       <form onSubmit={handleSubmit}>
           <label> Title</label>
           <input placeholder="enter the title" onChange={(e)=>setTitle(e.target.value)}  />
           <label> Review</label>
            <textarea placeholder="Review this place"  onChange={(e)=>setDesc(e.target.value)} />
           <label> Rating</label>
           <select  onChange={(e)=>setRating(e.target.value)} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
           </select>
           <button className="submitbutton" type="submit">Add Pin</button>
      </form>
     </div>
     </Popup>)
   }
   {/*new popup from user*/}

   {/*login signup*/}
     {currentUser ? (  <button className="button logout" onClick={()=>{setCurrentUser(null)}}>Logout</button>) : (  <div className="buttons">
       <button className="button login" onClick={()=>{setLogin(true);setRegister(false)}}>login</button>
       <button className="button register " onClick={()=>{setRegister(true);setLogin(false)}}>Register</button>
       </div>) }
      { register && <Register setRegister={setRegister} setCurrentUser={setCurrentUser} />}
      { login && <Login setLogin={setLogin} setCurrentUser={setCurrentUser}/>}
   </ReactMapGL>

     {/*warning for user not logged in*/}
     {
       warning && <div className="warningContainer">
          <div className="warning_contA">
              <div className="warning_contA_close" onClick={()=>{setWarning(false)}}>X</div>
              <div className="warning_contA_message">Please Login to add a pin !!</div>
          </div>
       </div>
     }

     {/*Double Click on Map on add a Pin*/}
     {
       instruction && <div className="warningContainer">
          <div className="warning_contA">
              <div className="warning_contA_close" onClick={()=>{setInstruction(false)}}>X</div>
              <div className="warning_contA_message">Double Click on Map to add your Memory Pin !!</div>
          </div>
       </div>
     }
    </div>
  );
}

export default App;
