import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
import { AppContext } from "../context/AppContext";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, bookRoom } = useContext(AppContext);
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const roomData = rooms.find((room) => String(room._id) === String(id));
    if (roomData) {
      setRoom(roomData);
      setMainImage(roomData.images[0]);
    }
  }, [id, rooms]);

  const handleAvailability = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const handleBookRoom = () => {
    // Calculate total days for the invoice
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const totalDays = Math.max(1, Math.ceil(timeDifference / (1000 * 3600 * 24)));

    // Redirect to Mock Checkout instead of booking immediately
    navigate("/checkout", {
      state: { room, checkIn, checkOut, guests, totalDays, guestName }
    });
    scrollTo(0, 0);
  };

  if (!room) return null;

  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Room Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name}
          <span className="font-inter text-sm"> ({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <StarRating />
        <p className="ml-2">200+ reviews</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="Room"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images?.length > 1 &&
            room.images.map((image, index) => (
              <img
                key={index}
                onClick={() => setMainImage(image)}
                src={image}
                alt="Room"
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                ${mainImage === image
                    ? "outline outline-3 outline-orange-500"
                    : ""
                  }`}
              />
            ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <h1 className="text-3xl md:text-4xl font-playfair">
          Experience Luxury Like Never Before
        </h1>

        <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
          {room.amenities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
            >
              <img
                src={facilityIcons[item]}
                alt={item}
                className="w-5 h-5"
              />
              <p className="text-xs">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <p className="text-2xl font-medium mt-4">
        ${room.pricePerNight}/night
      </p>

      {/* CheckIn CheckOut Form or Unavailable State */}
      {!room.isAvailable ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 shadow-sm p-10 rounded-xl mx-auto mt-16 max-w-5xl">
          <h2 className="text-2xl font-playfair text-gray-500 mb-2">Room Unavailable</h2>
          <p className="text-gray-400">This property is currently not accepting new bookings.</p>
          <button onClick={() => navigate('/rooms')} className="mt-6 px-8 py-3 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-all font-medium text-sm">
            Explore Other Properties
          </button>
        </div>
      ) : (
        <form onSubmit={handleAvailability} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-xl p-6 rounded-xl mx-auto mt-16 max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-gray-500">

            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="guestName" className="font-medium">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your full name"
                className="rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="1"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          {isBooked ? (
            <button
              onClick={handleBookRoom}
              type="button"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white rounded-md max-md:w-full px-10 py-3 mt-4 md:mt-0 font-medium"
            >
              Confirm Booking
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full px-6 py-3 mt-4 md:mt-0"
            >
              Check Availability
            </button>
          )}
        </form>
      )}

      {/* Common Specifications */}
      <div className="mt-20 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-3">
            <img
              src={spec.icon}
              alt={`${spec.title}-icon`}
              className="w-6"
            />
            <div>
              <p className="text-base font-medium">{spec.title}</p>
              <p className="text-gray-500 text-sm">
                {spec.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to
          availability. The price quoted is for two guests.
        </p>
      </div>

      {/* Hosted By */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={room.hotel.owner?.image}
            alt="Host"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p className="text-lg md:text-xl">
              Hosted By {room.hotel.name}
            </p>
            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2">200+ Reviews</p>
            </div>
          </div>
        </div>

        <button className="px-6 py-2.5 rounded text-white bg-primary hover:bg-primary-dull transition-all">
          Contact Now
        </button>
      </div>

    </div>
  );
};

export default RoomDetails;