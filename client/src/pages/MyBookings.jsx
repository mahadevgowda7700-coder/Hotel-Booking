import React, { useContext } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MyBookings = () => {

    const { bookings, confirmPayment } = useContext(AppContext);

    const handlePayment = (id) => {
        confirmPayment(id);
    }

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-[#fbffff]'>
            <Title title='My Bookings' subTitle='Easily manage your past, current and upcoming hotel reservation in one place plan your trips seamlessly with just a few clicks' align='left' />

            <div className='max-w-6xl mt-16 w-full text-gray-800 space-y-8'>
                {bookings && bookings.length > 0 ? bookings.map((booking) => (
                    <div key={booking._id} className='bg-white rounded-3xl border border-gray-100 p-6 md:p-8 flex flex-col lg:flex-row shadow-sm hover:shadow-xl transition-all gap-8 group'>
                        {/* ------- Hotel Details------*/}
                        <div className='flex flex-col md:flex-row flex-1 gap-6'>
                            <div className="relative overflow-hidden rounded-2xl md:w-56 h-40">
                                <img src={booking.room.images[0]} alt="hotel-img" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <p className="text-[10px] font-bold text-[#001F3F]">CONFIRMED</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-playfair text-3xl text-gray-800'>{booking.hotel.name}</p>
                                <p className="text-primary font-bold text-xs uppercase tracking-widest">{booking.room.roomType}</p>
                                <div className='flex items-center gap-2 text-sm text-gray-400 mt-2'>
                                    <img src={assets.locationIcon} alt="location-icon" className="h-4" />
                                    <span>{booking.hotel.address}, {booking.hotel.city}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-400'>
                                    <img src={assets.guestsIcon} alt="guests-icon" className="h-4" />
                                    <span> Guests: {booking.guests} Room</span>
                                </div>
                                <div className="mt-4">
                                    <p className='text-2xl font-bold text-[#001F3F]'>${booking.totalPrice} <span className="text-xs font-medium text-gray-400">Total Charged</span></p>
                                </div>
                            </div>
                        </div>
                        {/*--------Date & Timings-----*/}
                        <div className='flex flex-row md:items-center gap-12 border-y md:border-y-0 md:border-x border-gray-50 py-6 md:py-0 md:px-10'>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Check-In</p>
                                <p className='text-gray-800 font-bold'>
                                    {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="w-[1px] h-10 bg-gray-100"></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Check-Out</p>
                                <p className='text-gray-800 font-bold'>
                                    {new Date(booking.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        {/*--------Payment--------*/}
                        <div className='flex flex-row lg:flex-col items-center justify-center gap-4 lg:min-w-[150px]'>
                            <div className='flex items-center gap-3'>
                                <div className={`h-2.5 w-2.5 rounded-full ${booking.isPaid ? "bg-green-500 shadow-lg shadow-green-100" : "bg-amber-500 shadow-lg shadow-amber-100"}`} />
                                <p className={`text-xs font-bold uppercase tracking-widest ${booking.isPaid ? "text-green-600" : "text-amber-600"}`}>
                                    {booking.isPaid ? "Paid" : "Pending"}
                                </p>
                            </div>
                            {!booking.isPaid && (
                                <button onClick={() => handlePayment(booking._id)} className='px-8 py-3 bg-primary text-white text-xs font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase tracking-widest'>
                                    Pay Now
                                </button>
                            )}
                            {booking.isPaid && (
                                <button className='px-8 py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-full cursor-default uppercase tracking-widest'>
                                    Invoiced
                                </button>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="py-40 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <p className="text-2xl font-playfair text-gray-300">No journeys tracked yet.</p>
                        <p className="text-gray-400 mt-2">Your future world-class experiences will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBookings;
