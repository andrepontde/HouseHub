import React  from 'react'
import  {TheMainNavBar} from './components/layout/MainNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from 'pages/landingPage';
import LoginPage from 'pages/loginPage';

function App(){
  // const [showLogin, setShowLogin] = React.useState(true); // State to toggle between login and registration

  // const handleToggle = () => {
  //   setShowLogin(!showLogin); // Toggle the state to show either login or registration
  // };

  return (
    <BrowserRouter>
    <TheMainNavBar />
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
</BrowserRouter>
  );
}

export default App