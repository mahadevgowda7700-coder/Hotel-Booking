import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const MockCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookRoom, showNotification } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Extract booking details passed from RoomDetails
    const { room, checkIn, checkOut, guests, totalDays, guestName } = location.state || {};

    // If accessed directly without booking state, redirect
    if (!room) {
        navigate('/rooms');
        return null;
    }

    const totalPrice = room.pricePerNight * (totalDays || 1);

    const handlePay = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API delay
        setTimeout(() => {
            // 1. Record the booking globally (payment successful)
            bookRoom(room, checkIn, checkOut, guests, true, guestName); // Mark as paid

            // 2. Clear loading and Notify User
            setIsProcessing(false);
            showNotification("Payment Successful! Room Booked.");

            // 3. Redirect to My Bookings
            navigate('/my-bookings');
            scrollTo(0, 0);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col pt-16 font-inter">
            {/* Header Container */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white z-10 w-full lg:px-16">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                                <path d="M4 6h16v12H4zm2 2v8h12V8z" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold text-gray-700 bg-orange-100 text-orange-600 px-2 py-0.5 rounded uppercase tracking-wider">Test</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
                {/* Merchant Info */}
                <div className="text-center mb-6">
                    <p className="text-gray-500 font-medium mb-1">{room.hotel.name}</p>
                    <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">US${totalPrice.toFixed(2)}</h1>
                </div>

                {/* Pay with Link Button */}
                <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    type="button"
                    className="w-full bg-[#00E58F] text-[#0A2540] font-semibold py-4 rounded-xl flex justify-center items-center gap-2 mb-6 hover:bg-[#00D685] transition-colors shadow-sm"
                >
                    {isProcessing ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>Pay with <span className="font-bold text-xl tracking-tighter">link</span></>
                    )}
                </button>

                <div className="w-full flex items-center justify-center gap-3 mb-6">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm text-gray-400 font-medium">OR</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <form onSubmit={handlePay} className="w-full space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-[#30313D] mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            required
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-800 shadow-sm"
                        />
                    </div>

                    {/* Payment Method Details */}
                    <div>
                        <label className="block text-sm font-semibold text-[#30313D] mb-2">Payment method</label>
                        <div className="border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">

                            {/* Card Option */}
                            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="payment_method" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                                    <div className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                        <span className="text-gray-800 font-medium">Card</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-80">
                                    <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center text-[8px] text-white font-bold italic tracking-tighter">VISA</div>
                                    <div className="w-8 h-5 bg-black rounded flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 -mr-1"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 bg-opacity-80"></div>
                                    </div>
                                </div>
                            </label>

                            <div className="h-px bg-gray-200 w-full ml-11"></div>

                            {/* Cash App Option */}
                            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="payment_method" className="w-4 h-4 focus:ring-blue-500" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-[#00D632] rounded flex items-center justify-center text-white font-bold text-sm">$</div>
                                        <span className="text-gray-800 font-medium">Cash App Pay</span>
                                    </div>
                                </div>
                            </label>

                            <div className="h-px bg-gray-200 w-full ml-11"></div>

                            {/* Amazon Pay Option */}
                            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="payment_method" className="w-4 h-4 focus:ring-blue-500" />
                                    <div className="flex items-center gap-2">
                                        <div className="text-gray-700 font-bold text-sm tracking-tighter px-1">amazon<span className="font-normal text-orange-500">pay</span></div>
                                    </div>
                                </div>
                            </label>

                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold py-4 rounded-xl transition-colors shadow-sm mt-4 flex justify-center items-center"
                    >
                        {isProcessing ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : "Pay"}
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span>Powered by <span className="font-bold text-gray-700">stripe</span></span>
                    <div className="w-px h-3 bg-gray-300"></div>
                    <a href="#" className="hover:text-gray-800">Terms</a>
                    <a href="#" className="hover:text-gray-800">Privacy</a>
                </div>
            </div>
        </div>
    );
};

export default MockCheckout;
