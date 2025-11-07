import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Order from './pages/Order'
import Login from './pages/Login'
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext'

function App() {
  let {adminData}=useContext(adminDataContext)
  return (
      <>
      {!adminData?(<Login/>):(
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<Lists/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
      )}
    </>
  )
}

export default App
