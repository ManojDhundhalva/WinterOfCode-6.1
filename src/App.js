import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar.jsx';
import Payment from './Components/Payment.jsx';
import Profile from './Components/Profile.jsx';
import Homepage from './Components/Homepage.jsx';
import Footer from './Components/Footer.jsx';
import Booklist from './Components/Booklist.jsx';
import Temp from './Components/temp.jsx';
import CancelTicket from './Components/CancelTicket.jsx';
import Mystery from './Components/Mystery.jsx';
import AboutUS from './Components/AboutUS.jsx';

//Pages
import RegisterPage from './Pages/Register.jsx';
import LoginPage from './Pages/Login.jsx';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  const localEmail = window.localStorage.getItem("LocalEmail");
  const navigate = useNavigate();
  useEffect(() => {
    if (localEmail == null) {
      navigate("/login");
    }
    else {
      navigate("/");
    }
  }, [localEmail]);
  return (
    <>
      {
        (localEmail == null ?
          (
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
            </Routes>
          )
          :
          (
            <>
              <NavBar />
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/payment" element={<Payment />} />
                <Route exact path="/booklist" element={<Booklist />} />
                <Route exact path="/about" element={<AboutUS />} />
                <Route exact path="/temp" element={<Temp />} />
                <Route exact path="/cancelticket" element={<CancelTicket />} />
                <Route exact path="/mystery" element={<Mystery />} />
              </Routes>
              <Footer />
            </>
          )
        )
      }
    </>
  );
}

export default App;