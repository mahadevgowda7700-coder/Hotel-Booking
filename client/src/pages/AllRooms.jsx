import React, { useEffect, useState, useContext } from 'react';
import Title from '../components/Title';
import HotelCard from '../components/HotelCard';
import { assets } from '../assets/assets';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const AllRooms = () => {

  const { rooms } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const destinationFromUrl = searchParams.get('destination') || '';

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const handleClear = () => {
    setSelectedTypes([]);
    setSelectedPriceRanges([]);
    setSortOrder('');
  };

  const handleTypeChange = (type) => {
    if (type === "All") {
      handleClear();
      return;
    }
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  }

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  }

  useEffect(() => {
    let tempRooms = rooms;

    if (destinationFromUrl) {
      const destinations = destinationFromUrl.split(',').map(d => d.trim().toLowerCase()).filter(d => d);
      if (destinations.length > 0) {
        tempRooms = tempRooms.filter(room =>
          destinations.some(dest =>
            room.hotel.city.toLowerCase().includes(dest) ||
            room.hotel.address.toLowerCase().includes(dest)
          )
        );
      }
    }

    if (selectedTypes.length > 0) {
      tempRooms = tempRooms.filter(room => selectedTypes.includes(room.roomType));
    }

    if (selectedPriceRanges.length > 0) {
      tempRooms = tempRooms.filter(room => {
        return selectedPriceRanges.some(range => {
          if (range === '0-500') return room.pricePerNight <= 500;
          if (range === '500-1000') return room.pricePerNight > 500 && room.pricePerNight <= 1000;
          if (range === '1000-2000') return room.pricePerNight > 1000 && room.pricePerNight <= 2000;
          if (range === '2000-3000') return room.pricePerNight > 2000 && room.pricePerNight <= 3000;
          return false;
        });
      });
    }

    if (sortOrder === 'low-high') {
      tempRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOrder === 'high-low') {
      tempRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    setFilteredRooms(tempRooms);

  }, [destinationFromUrl, selectedTypes, selectedPriceRanges, sortOrder, rooms]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 py-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-[#fbffff]'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <div onClick={() => setShowFilter(!showFilter)} className='flex items-center gap-2 text-xl font-medium cursor-pointer mb-4'>
          <p className='uppercase tracking-widest text-[#001F3F]'>Filters</p>
          <img className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.arrowIcon} alt="" />
        </div>

        {/* Filter Container */}
        <div className={`border border-gray-200 pl-5 py-6 mt-6 bg-white rounded-xl shadow-sm transition-all duration-300 ${showFilter ? '' : 'hidden sm:block'}`}>
          <div className='flex justify-between items-center pr-5 mb-4 border-b border-gray-100 pb-2'>
            <p className='text-sm font-bold text-[#001F3F]'>Room Types</p>
            <button onClick={handleClear} className='text-xs text-blue-600 hover:underline'>CLEAR</button>
          </div>
          <div className='flex flex-col gap-3 lg:gap-4 text-sm font-light text-gray-700'>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input className='w-4 h-4 rounded cursor-pointer accent-primary' type="checkbox" value="All" checked={selectedTypes.length === 0 && selectedPriceRanges.length === 0 && sortOrder === ''} onChange={handleClear} /> All
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input className='w-4 h-4 rounded cursor-pointer accent-primary' type="checkbox" value="Single Bed" checked={selectedTypes.includes("Single Bed")} onChange={() => handleTypeChange("Single Bed")} /> Single Bed
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input className='w-4 h-4 rounded cursor-pointer accent-primary' type="checkbox" value="Double Bed" checked={selectedTypes.includes("Double Bed")} onChange={() => handleTypeChange("Double Bed")} /> Double Bed
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input className='w-4 h-4 rounded cursor-pointer accent-primary' type="checkbox" value="Luxury Room" checked={selectedTypes.includes("Luxury Room")} onChange={() => handleTypeChange("Luxury Room")} /> Luxury Room
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input className='w-4 h-4 rounded cursor-pointer accent-primary' type="checkbox" value="Family Suite" checked={selectedTypes.includes("Family Suite")} onChange={() => handleTypeChange("Family Suite")} /> Family Suite
            </p>
          </div>

          <p className='mb-3 mt-8 text-sm font-bold text-[#001F3F] uppercase tracking-wider'>Price Range</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 pr-5'>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input type="checkbox" className='w-4 h-4 rounded cursor-pointer accent-primary' checked={selectedPriceRanges.includes('0-500')} onChange={() => handlePriceRangeChange('0-500')} /> $ 0 to 500
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input type="checkbox" className='w-4 h-4 rounded cursor-pointer accent-primary' checked={selectedPriceRanges.includes('500-1000')} onChange={() => handlePriceRangeChange('500-1000')} /> $ 500 to 1000
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input type="checkbox" className='w-4 h-4 rounded cursor-pointer accent-primary' checked={selectedPriceRanges.includes('1000-2000')} onChange={() => handlePriceRangeChange('1000-2000')} /> $ 1000 to 2000
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input type="checkbox" className='w-4 h-4 rounded cursor-pointer accent-primary' checked={selectedPriceRanges.includes('2000-3000')} onChange={() => handlePriceRangeChange('2000-3000')} /> $ 2000 to 3000
            </p>
          </div>

          <p className='mb-3 mt-8 text-sm font-bold text-[#001F3F] uppercase tracking-wider'>Sort By</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 pr-5 pb-2'>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input type="radio" name="sort" className='w-4 h-4 cursor-pointer accent-primary' checked={sortOrder === 'low-high'} onChange={() => setSortOrder('low-high')} /> Price Low to High
            </p>
            <p className='flex gap-2 items-center hover:text-primary transition-colors cursor-pointer'>
              <input type="radio" name="sort" className='w-4 h-4 cursor-pointer accent-primary' checked={sortOrder === 'high-low'} onChange={() => setSortOrder('high-low')} /> Price High to Low
            </p>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className='flex-1'>
        <div className='flex flex-col items-start'>
          <Title title='Hotel Rooms' align='left' subTitle='Take advantages of our limited-time offers and special packages to enhance your stay and create unforgettable memories.' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-10'>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div key={room._id || index} className='flex'>
                <HotelCard room={room} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl font-playfair text-gray-400">No rooms found for "{destinationFromUrl}"</p>
              <button onClick={() => navigate('/rooms')} className="mt-4 text-primary font-medium hover:underline">View All available rooms</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllRooms;
