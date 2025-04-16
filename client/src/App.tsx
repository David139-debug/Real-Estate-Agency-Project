import Navbar from "./Components/Navbar/Navbar"
import Wrapper from "./Components/Welcome/Wrapper"
import Places from "./Components/Places/Places"
import Login from "./Components/Authorization/Login"
import Register from "./Components/Authorization/Register"
import Properties from "./Components/Properties/Properties"
import AddMenu from "./Components/Properties/AddMenu/AddMenu"
import Card from "./Components/Properties/Card/Card"
import Profile from "./Components/Profile/Profile"
import AgentList from "./Components/AgentList/AgentList"
import Contact from "./Components/Contact/Contact"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Wrapper />
            <Places />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/addMenu" element={<AddMenu />
        } />
        <Route path="/card" element={<Card />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/agentList" element={<AgentList />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
