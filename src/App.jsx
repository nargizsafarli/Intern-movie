import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MoviePage from './Pages/MoviePage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'

function App() {
  return (
    <div>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='movie' element={<MoviePage/>}></Route>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='contact' element={<ContactPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App