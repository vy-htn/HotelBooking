import React from 'react';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import HomePage from './views/homepage'; 
import Availability from './views/selectpage';
import GuestInfo from './views/guestinfo';
import MyComponent from './daterange';
import RoomSelection from './slguest';
import TakeMoney from './views/payment';
import RegisterForm from './views/register';
import LoginForm from './views/login';


function App()  {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/info" element={< GuestInfo/>} />
        <Route path="/payment" element={< TakeMoney/>} />
        <Route path="/join" element={< RegisterForm/>} />
        <Route path="/login" element={< LoginForm/>} />

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};


export default App;
