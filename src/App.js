import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
function App() {
  return (
    <div className="App">
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/landing" element={<LandingPage />} />
       </Routes>
    </div>
  );
}

export default App;
