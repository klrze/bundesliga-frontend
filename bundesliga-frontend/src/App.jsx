import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Players from './components/Players';
import Home from './components/Home';
import Team from './components/Team';
import './App.css'
import Card from './components/Card';


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <div class="app">
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Home />}></Route>
        <Route path='/home' element = { <Home />}></Route>
        <Route path='/players' element = { <Players />}></Route>
        <Route path='/team' element = { <Team />}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
