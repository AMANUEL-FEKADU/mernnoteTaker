import React from 'react'
import { Route, Routes } from "react-router-dom"
import Notes from './pages/Notes'
import Create from './pages/Create'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Autho from './pages/Autho'
import Register from './pages/Register'
function App() {
  return (
    <div>
     
      
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/notes/:id' element={<Detail/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/signup' element={<Autho/>}/>
          <Route path='/register' element={<Register/>}/>
         
      </Routes>
    </div>
  )
}

export default App