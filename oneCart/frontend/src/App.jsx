

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Registation from './pages/Registation'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from '../src/component/Nav'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

function App() {
  let {userData} =useContext(UserContext)
  

  return (
  <>
      {userData&&<Nav/>}
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Registation/>}/>



   </Routes>
   </>
  )
}

export default App
