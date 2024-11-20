import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from "./components/Register";
import Vlsi from './components/Vlsi';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Payment from "../src/components/Payment"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vlsi/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    
    </BrowserRouter>

      
    
  )
}

export default App
