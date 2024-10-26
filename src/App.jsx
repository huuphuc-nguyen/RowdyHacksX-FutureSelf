import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import AddLetter from './pages/AddLetter/AddLetter'
import AddGoal from './pages/AddGoal/AddGoal'


function App() {
    return (   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-letter" element={<AddLetter />} />
        <Route path="/add-goal" element={<AddGoal />} />
        <Route path="/" element={<Home />} />
      </Routes>
  )
}

export default App
