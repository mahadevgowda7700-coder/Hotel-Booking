import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const FeaturedDestination = () => {

  const navigate = useNavigate()
  const { rooms } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

      <Title title='Featured Destination' subTitle=' Discover our handpicked selection of exceptional properties around the world, offering unparalled luxury and unforgetable memories...' />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 w-full max-w-[1400px] mt-20 px-4'>
        {rooms.slice(0, 4).map((room, index) => (
          <div key={room._id} className="flex">
            <HotelCard room={room} index={index} />
          </div>
        ))}
      </div>
      <button onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View ALL Destination
      </button>
    </div>
  );
}

export default FeaturedDestination;
