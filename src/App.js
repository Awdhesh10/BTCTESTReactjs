import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Instruction from './components/Instruction';
import UserTypingDetails from 'components/UserTypingDetails';
function App() {
  return (
    <div className="App">
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/Instruction" element={<Instruction />} />
         <Route path="/landing" element={<LandingPage />} />
         <Route path="/typingdetails" element={<UserTypingDetails />} />
       </Routes>
    </div>
  );
}

export default App;
