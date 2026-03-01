import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarLinks = [
    { name: "Back to Home", path: "/", icon: assets.homeIcon },
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ]
  return (
    <div className='md:w-64 w-20 border-r h-full text-base border-gray-100 pt-10 pb-6 flex flex-col justify-between transition-all duration-300 bg-white fixed left-0 top-0 z-[100]'>
      <div>
        <div className="flex items-center justify-center md:justify-start px-6 mb-16">
          <img className='h-8 cursor-pointer' onClick={() => navigate('/')} src={assets.logo} alt="QuickStay" />
        </div>
        <div className="flex flex-col w-full">
          {sidebarLinks.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === '/owner' && location.pathname === '/owner/');
            return (
              <NavLink to={item.path} key={index} className={`flex items-center py-5 px-6 md:px-10 gap-4 transition-all ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "hover:bg-gray-50 text-gray-500 font-medium"}`}>
                <img src={item.icon} alt={item.name} className={`h-6 w-6 ${isActive ? 'invert brightness-0' : 'opacity-60'}`} />
                <p className='md:block hidden uppercase tracking-widest text-[10px] font-bold'>{item.name}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center md:justify-start px-6 md:px-10 mt-auto">
        <UserButton afterSignOutUrl="/">
          <UserButton.MenuItems>
            <UserButton.Action label="My Bookings" labelIcon={<img src={assets.listIcon} alt="bookings" className="w-4 h-4 opacity-70" />} onClick={() => navigate('/my-bookings')} />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </div>
  );
}

export default Sidebar;
