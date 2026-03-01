import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/hotelOwner/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex bg-[#fbffff] min-h-screen'>
      <Sidebar />
      <div className='flex-1 md:ml-64 ml-20 p-6 md:p-12 min-h-screen overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
