import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import AddLetter from './pages/AddLetter/AddLetter'
import AddGoal from './pages/AddGoal/AddGoal'
import AllLetters from './pages/AllLetters/AllLetters'
import AllGoals from './pages/AllGoals/AllGoals'
import DataDisplay from "./pages/DataDisplay"
import { Toaster } from 'sonner'

function App() {
    return (   <>
      <Toaster position='top-right' richColors closeButton  />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-letter" element={<AddLetter />} />
        <Route path="/add-goal" element={<AddGoal />} />
        <Route path="/all-letters" element={<AllLetters />} />
        <Route path="/all-goals" element={<AllGoals />} />
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<DataDisplay/>}/>
      </Routes>
      </>
  )
}

export default App;
