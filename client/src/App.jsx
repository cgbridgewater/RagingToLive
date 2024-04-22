import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import MapPage from './views/MapPage.jsx';
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Profile from "./views/Profile.jsx";
import BadLink from "./views/BadLink.jsx";
import Logout from "./components/Logout.jsx";
import DeleteUser from "./components/DeleteUser.jsx";
import UpdateLocation from "./views/UpdateLocation.jsx";
import UpdateSocials from "./views/UpdateSocials.jsx";

function App() {

  const [ authorized, setAuthorized ] = useState("");

  return (
  <BrowserRouter>
    <Routes>
      <>
        <Route path="/" default element={<MapPage/>}/>
        <Route path="/login" element={<Login  authorized={authorized} setAuthorized={setAuthorized} />} />
        <Route path="/register" element={<Register  authorized={authorized} setAuthorized={setAuthorized} /> } />
        <Route path="/profile" element={<Profile  setAuthorized={setAuthorized}/>} />
        <Route path="/profile/logout" element={<Logout  setAuthorized={setAuthorized} />}  />
        <Route path="/profile/delete" element={<DeleteUser  setAuthorized={setAuthorized} />}  />
        <Route path="/profile/updateaddress" element={<UpdateLocation setAuthorized={setAuthorized} />}/> {/* Create page before activating!! */}
        <Route path="/profile/updatesocials" element={<UpdateSocials setAuthorized={setAuthorized} />}/> {/* Create page before activating!! */}
        <Route path="/:bad/*" element={<Navigate to="/404-not-found"/>}/>
        <Route path="/404-not-found" element={<BadLink />}/>
      </>
    </Routes>
  </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);