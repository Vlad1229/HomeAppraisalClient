import React from "react"
import './App.css'
import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import RegionsPage from './components/RegionsPage'
import RegionDetails from './components/RegionDetails'
import EditCreateRegion from './components/EditCreateRegion'
import DwellingsPage from './components/DwellingsPage'
import DwellingDetails from './components/DwellingDetails'
import EditCreateDwelling from './components/EditCreateDwelling'
import { useState } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"))
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [editableRegion, setEditableRegion] = useState(null)
  const [editableDwelling, setEditableDwelling] = useState(null)

  const handleLogOut = (e) => {
    localStorage.removeItem("token")
    setToken(null)
    localStorage.removeItem("isAdmin")
    setIsAdmin(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar isAdmin = {isAdmin == true} isUser = {token != null} handleLogOut = {handleLogOut}/>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/regions" element={<RegionsPage setEditableRegion = {setEditableRegion}/>} />
            <Route path="/regions/:id" element={<RegionDetails setEditableRegion = {setEditableRegion}/>} />
            <Route path="/create_region" element={<EditCreateRegion isCreating = {true}/>} />
            <Route path="/edit_region/:id" element={<EditCreateRegion isCreating = {false} regionData = {editableRegion}/>} />
            <Route exact path="/dwellings" element={<DwellingsPage setEditableDwelling = {setEditableDwelling}/>} />
            <Route path="/dwellings/:id" element={<DwellingDetails setEditableDwelling = {setEditableDwelling}/>} />
            <Route path="/create_dwelling" element={<EditCreateDwelling isCreating = {true}/>} />
            <Route path="/edit_dwelling/:id" element={<EditCreateDwelling isCreating = {false} regionData = {editableRegion}/>} />
            <Route path="/login" element={<Login setIsAdmin = {setIsAdmin} setToken = {setToken}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;