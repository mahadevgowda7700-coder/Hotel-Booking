import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import Experience from './pages/Experience';
import About from './pages/About';
import MockCheckout from './pages/MockCheckout';
import AppContextProvider from './context/AppContext';
import { useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

const AppContent = () => {
  const isOwnwerPath = useLocation().pathname.includes("owner");
  const { isSignedIn, isLoaded } = useUser();
  const { showNotification } = useContext(AppContext);
  useEffect(() => {
    if (isLoaded) {
      const storedState = sessionStorage.getItem('wasSignedIn');

      if (storedState === null) {
        sessionStorage.setItem('wasSignedIn', isSignedIn);
        return;
      }

      const wasSignedIn = storedState === 'true';

      if (!wasSignedIn && isSignedIn) {
        showNotification("Login successfully");
      } else if (wasSignedIn && !isSignedIn) {
        showNotification("Logout successfully");
      }

      sessionStorage.setItem('wasSignedIn', isSignedIn);
    }
  }, [isSignedIn, isLoaded, showNotification]);

  return (
    <div className='bg-[#fbffff]'>
      {!isOwnwerPath && <Navbar />}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/checkout' element={<MockCheckout />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/about' element={<About />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;
