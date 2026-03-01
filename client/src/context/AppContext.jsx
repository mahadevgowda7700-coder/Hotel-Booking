import React, { createContext, useState, useEffect } from 'react';
import { assets, roomsDummyData, userBookingsDummyData, hotelDummyData, userDummyData } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    // Enhanced dummy data with distinct hotels and Unsplash images
    const initialRooms = [
        ...roomsDummyData,
        {
            _id: "room_5",
            hotel: {
                ...hotelDummyData,
                name: "Atlantis The Palm Resorts",
                city: "Dubai",
                address: "Crescent Rd, The Palm Jumeirah",
                _id: "h2"
            },
            roomType: "Ocean Suite",
            pricePerNight: 899,
            amenities: ["Pool Access", "Free Breakfast", "Mountain View"],
            images: [
                assets.roomImg1,
                assets.roomImg2,
                assets.roomImg3,
                assets.roomImg4
            ],
            isAvailable: true
        },
        {
            _id: "room_6",
            hotel: {
                ...hotelDummyData,
                name: "Marina Bay Boutique",
                city: "Singapore",
                address: "10 Bayfront Ave",
                _id: "h3"
            },
            roomType: "Premium King Bed",
            pricePerNight: 550,
            amenities: ["Free WiFi", "Room Service"],
            images: [
                assets.roomImg4,
                assets.roomImg1,
                assets.roomImg2,
                assets.roomImg3
            ],
            isAvailable: true
        },
        {
            _id: "room_7",
            hotel: {
                ...hotelDummyData,
                name: "The Savoy Heritage",
                city: "London",
                address: "Strand, London WC2R 0EZ",
                _id: "h4"
            },
            roomType: "Classic Double",
            pricePerNight: 420,
            amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
            images: [
                assets.roomImg3,
                assets.roomImg4,
                assets.roomImg1,
                assets.roomImg2
            ],
            isAvailable: true
        },
        {
            _id: "room_8",
            hotel: {
                ...hotelDummyData,
                name: "Le Meurice Palace",
                city: "Paris",
                address: "228 Rue de Rivoli",
                _id: "h5"
            },
            roomType: "Luxury Suite",
            pricePerNight: 950,
            amenities: ["Free WiFi", "Room Service", "Pool Access"],
            images: [
                assets.roomImg2,
                assets.roomImg3,
                assets.roomImg4,
                assets.roomImg1
            ],
            isAvailable: true
        }
    ];

    const [rooms, setRooms] = useState(initialRooms);
    const [bookings, setBookings] = useState(userBookingsDummyData);
    const [notification, setNotification] = useState(null);

    // Persist in session
    useEffect(() => {
        const savedRooms = sessionStorage.getItem('hotel_rooms_v8');
        const savedBookings = sessionStorage.getItem('hotel_bookings_v8');
        if (savedRooms) setRooms(JSON.parse(savedRooms));
        if (savedBookings) setBookings(JSON.parse(savedBookings));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('hotel_rooms_v8', JSON.stringify(rooms));
        sessionStorage.setItem('hotel_bookings_v8', JSON.stringify(bookings));
    }, [rooms, bookings]);

    const addNewRoom = (newRoom) => {
        setRooms((prev) => [...prev, { ...newRoom, _id: Date.now().toString() }]);
        showNotification("Room Added Successfully!");
    };

    const toggleRoomAvailability = (id) => {
        setRooms((prev) => prev.map(room =>
            room._id === id ? { ...room, isAvailable: !room.isAvailable } : room
        ));
    };

    const bookRoom = (roomData, checkInDate, checkOutDate, guests, isPaid = false, guestName = 'Guest') => {
        const newBooking = {
            _id: Date.now().toString(),
            user: userDummyData,
            guestName: guestName || userDummyData.username,
            room: roomData,
            hotel: roomData.hotel,
            checkInDate: new Date(checkInDate).toISOString(),
            checkOutDate: new Date(checkOutDate).toISOString(),
            totalPrice: roomData.pricePerNight * Number(guests),
            guests: Number(guests),
            status: "pending",
            paymentMethod: isPaid ? "Card" : "Pay At Hotel",
            isPaid: isPaid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setBookings(prev => [newBooking, ...prev]);
        if (!isPaid) {
            showNotification("Room Booked Successfully!");
        }
    };

    const confirmPayment = (bookingId) => {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, isPaid: true } : b));
        showNotification("Payment Successful!");
    };

    const clearBookings = () => {
        setBookings([]);
        showNotification("Bookings Cleared");
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const value = {
        rooms,
        setRooms,
        addNewRoom,
        toggleRoomAvailability,
        bookRoom,
        bookings,
        confirmPayment,
        clearBookings,
        notification,
        showNotification,
        hotelDummyData // Exporting for use in AddRoom
    };

    return (
        <AppContext.Provider value={value}>
            {children}
            {notification && (
                <div className="fixed bottom-10 right-10 bg-black text-white px-6 py-3 rounded-lg shadow-2xl z-[100] animate-bounce">
                    {notification}
                </div>
            )}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
