import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const HotelCard = ({ room, index }) => {
    return (
        <Link to={'/rooms/' + room._id} onClick={() => scrollTo(0, 0)} key={room._id}
            className='relative flex flex-col w-full h-full rounded-2xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>

            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                <img src={room.images[0]} alt={room.hotel.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-[10px] bg-white/90 backdrop-blur-sm shadow-sm text-gray-800 font-bold uppercase tracking-widest rounded-full'>Best Seller</p>}
            </div>

            <div className='p-6 flex flex-col flex-1'>
                <div className='flex items-start justify-between gap-4'>
                    <p className='font-playfair text-xl font-medium text-gray-800 line-clamp-1'>{room.hotel.name}</p>
                    <div className='flex items-center gap-1 flex-shrink-0 mt-1'>
                        <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" /> <span className="text-sm font-bold text-gray-700">4.5</span>
                    </div>
                </div>

                <div className='flex items-center gap-2 text-sm mt-3 text-gray-500'>
                    <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4 opacity-50" />
                    <span className="line-clamp-1">{room.hotel.address}</span>
                </div>

                <div className='mt-auto pt-6'>
                    <div className="flex items-center justify-between">
                        <p><span className='text-2xl font-bold text-[#001F3F]'>${room.pricePerNight}</span><span className="text-sm text-gray-400">/night</span></p>
                        <button className='px-5 py-2.5 text-xs font-bold bg-white border border-gray-200 text-[#001F3F] rounded-xl hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm uppercase tracking-widest'>Book Now</button>
                    </div>
                </div>
            </div>

        </Link>
    );
}

export default HotelCard;
