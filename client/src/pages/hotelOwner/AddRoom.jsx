import React, { useState, useContext } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AddRoom = () => {
  const navigate = useNavigate();
  const { addNewRoom, hotelDummyData } = useContext(AppContext);

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: '',
    amenites: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const assignedImages = [
      images[1] ? URL.createObjectURL(images[1]) : assets.roomImg1,
      images[2] ? URL.createObjectURL(images[2]) : assets.roomImg2,
      images[3] ? URL.createObjectURL(images[3]) : assets.roomImg3,
      images[4] ? URL.createObjectURL(images[4]) : assets.roomImg4,
    ];

    const newRoom = {
      hotel: hotelDummyData,
      roomType: inputs.roomType,
      pricePerNight: Number(inputs.pricePerNight),
      amenities: Object.keys(inputs.amenites).filter(key => inputs.amenites[key]),
      images: assignedImages,
      isAvailable: true,
    }

    addNewRoom(newRoom);
    navigate('/owner/list-room');
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-50 border border-gray-100 overflow-hidden">
        {/* Fixed-style Header */}
        <div className="bg-gradient-to-r from-[#001F3F] to-blue-900 p-10 md:p-14 text-white">
          <h1 className="text-4xl font-playfair mb-4 italic">List a New <span className="text-primary not-italic font-bold">Experience</span></h1>
          <p className="text-blue-100/70 max-w-2xl text-lg leading-relaxed">
            Provide the finest details about your luxury room. Our curators will review the listing to ensure it meets our premium standards of excellence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 md:p-16">
          {/* Images Section */}
          <div className="mb-16">
            <h2 className="text-[#001F3F] font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span>
              Room Photography
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {Object.keys(images).map((key) => (
                <label htmlFor={`roomImage${key}`} key={key} className="group cursor-pointer">
                  <div className="aspect-square border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center overflow-hidden hover:border-primary hover:bg-blue-50/50 transition-all group-active:scale-95 relative bg-gray-50/30">
                    <img className={`object-cover ${images[key] ? 'w-full h-full' : 'h-10 opacity-20'}`}
                      src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
                    {!images[key] && <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Upload</p>}
                    {images[key] && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        CHANGE
                      </div>
                    )}
                  </div>
                  <input type='file' accept='image/*' id={`roomImage${key}`} hidden
                    onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Room Type */}
            <div className='flex flex-col'>
              <h2 className="text-[#001F3F] font-bold uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary"></span>
                Classification
              </h2>
              <select
                value={inputs.roomType}
                onChange={e => setInputs({ ...inputs, roomType: e.target.value })}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5 w-full outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-700 appearance-none shadow-inner"
                required
              >
                <option value="">Select Category</option>
                <option value="Single Bed">Classic Single Room</option>
                <option value="Double Bed">Executive Double Room</option>
                <option value="Luxury Room">Presidential Suite</option>
                <option value="Family Suite">Grand Family Villa</option>
              </select>
            </div>

            {/* Price */}
            <div className='flex flex-col'>
              <h2 className="text-[#001F3F] font-bold uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary"></span>
                Rate / Night ($)
              </h2>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                  type='number'
                  placeholder='Eg: 499'
                  className='bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-10 w-full outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-800 shadow-inner'
                  value={inputs.pricePerNight}
                  onChange={e => setInputs({ ...inputs, pricePerNight: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-16">
            <h2 className="text-[#001F3F] font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span>
              Curated Amenities
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {Object.keys(inputs.amenites).map((amenity, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer group select-none ${inputs.amenites[amenity] ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-100' : 'bg-gray-50/50 border-gray-50 hover:border-primary/30'}`}
                  onClick={() => setInputs({ ...inputs, amenites: { ...inputs.amenites, [amenity]: !inputs.amenites[amenity] } })}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${inputs.amenites[amenity] ? 'bg-white border-white scale-110' : 'border-gray-200 bg-white group-hover:border-primary/50'}`}>
                    {inputs.amenites[amenity] && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                  <label className={`cursor-pointer font-bold text-xs uppercase tracking-widest ${inputs.amenites[amenity] ? 'text-white' : 'text-gray-500'}`}> {amenity}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-t border-gray-100 pt-16">
            <p className="text-gray-400 text-sm max-w-sm italic">
              *By submitting this form, you certify that the information provided is accurate and adheres to the luxury hospitality guild's guidelines.
            </p>
            <button type='submit' className='bg-primary text-white font-bold px-16 py-6 rounded-3xl cursor-pointer active:scale-95 transition-all shadow-2xl shadow-blue-200 hover:bg-blue-700 uppercase tracking-[0.2em] text-sm'>
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
