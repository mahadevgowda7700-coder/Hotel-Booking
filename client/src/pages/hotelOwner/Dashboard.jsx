import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { UserButton } from '@clerk/clerk-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { rooms, bookings, clearBookings } = useContext(AppContext);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 min-h-[85vh] relative z-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <Title align="left" font="outfit" title="Dashboard Overview" subTitle="Analyze your performance, track bookings, and manage your luxury properties with ease." />
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={clearBookings}
            className="px-8 py-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all font-bold text-sm shadow-sm border border-red-100 active:scale-95"
          >
            CLEAR ALL RECORDS
          </button>
          <div className="bg-gray-50 p-2 rounded-full border border-gray-100 flex items-center justify-center">
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<img src={assets.listIcon} alt="bookings" className="w-4 h-4 opacity-70" />} onClick={() => navigate('/my-bookings')} />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {/* Total Bookings */}
        <div className='bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl flex items-center p-8 shadow-sm hover:shadow-lg transition-all group'>
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <img src={assets.totalBookingIcon} alt="" className='h-8 w-8 group-hover:invert transition-all' />
          </div>
          <div className='flex flex-col ml-6'>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-widest'>Total Bookings</p>
            <p className='text-[#001F3F] text-4xl font-bold mt-1'>{bookings?.length || 0}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className='bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-3xl flex items-center p-8 shadow-sm hover:shadow-lg transition-all group'>
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
            <img src={assets.totalRevenueIcon} alt="" className='h-8 w-8 group-hover:invert transition-all' />
          </div>
          <div className='flex flex-col ml-6'>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-widest'>Total Revenue</p>
            <p className='text-green-800 text-4xl font-bold mt-1'>$ {bookings?.reduce((acc, b) => acc + (b.isPaid ? b.totalPrice : 0), 0) || 0}</p>
          </div>
        </div>

        {/* Total Rooms */}
        <div className='bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl flex items-center p-8 shadow-sm hover:shadow-lg transition-all group'>
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
            <img src={assets.listIcon} alt="" className='h-8 w-8 group-hover:invert transition-all' />
          </div>
          <div className='flex flex-col ml-6'>
            <p className='text-gray-400 text-xs font-bold uppercase tracking-widest'>Total Rooms</p>
            <p className='text-[#001F3F] text-4xl font-bold mt-1'>{rooms?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className='text-xl text-[#001F3F] font-bold'> Recent Bookings </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Updates</span>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className="text-left bg-gray-50/20">
                <th className='py-5 px-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest'>Guest</th>
                <th className='py-5 px-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest max-sm:hidden'>Room Type</th>
                <th className='py-5 px-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest text-center'>Total Amount</th>
                <th className='py-5 px-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest text-center'>Payment</th>
              </tr>
            </thead>
            <tbody className='text-sm font-medium'>
              {bookings && bookings.length > 0 ? bookings.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors border-t border-gray-50">
                  <td className='py-5 px-8'>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shadow-sm">
                        {(item.guestName || item.user.username).charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-800 font-bold">{item.guestName || item.user.username}</span>
                    </div>
                  </td>
                  <td className='py-5 px-8 text-gray-500 max-sm:hidden'>
                    {item.room.roomType}
                  </td>
                  <td className='py-5 px-8 text-gray-800 text-center font-bold'>
                    $ {item.totalPrice}
                  </td>
                  <td className='py-5 px-8 text-center'>
                    <span className={`py-2 px-6 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-24 text-center">
                    <img src={assets.logo} className="h-6 mx-auto opacity-10 grayscale mb-4" alt="" />
                    <p className="text-gray-400 italic font-medium">No activity recorded yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
