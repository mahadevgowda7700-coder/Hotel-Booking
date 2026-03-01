import React from 'react';
import { assets, exclusiveOffers } from '../assets/assets';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const ExclusiveOffers = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title align='left' title='Exclusive Offers' subTitle='Take advantage of the our limited time of offers and spical
         packages to enhance your stay and create unforgetable memories..'/>
        <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
          View All Offers
          <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all' />
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
        {exclusiveOffers.map((item) => (
          <div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18
            px-4 rounded-xl text-white bg-on-repeat bg-cover bg-center overflow-hidden min-h-[350px]' style={{ backgroundImage: `url(${item.image})` }}>
            <p className='px-4 py-1.5 absolute top-5 left-5 text-[10px] bg-white text-gray-800 font-bold rounded-full shadow-lg'> {item.priceOff}% OFF</p>
            <div className="z-10 mt-auto bg-gradient-to-t from-black/80 to-transparent p-6 w-full -mx-4">
              <p className='text-3xl font-bold font-playfair mb-2'>{item.title}</p>
              <p className="text-sm text-white/80 line-clamp-2"> {item.description}</p>
              <p className='text-[10px] font-bold text-primary mt-4 uppercase tracking-[0.2em]'>Expires {item.expiryDate}</p>
              <button
                onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
                className='flex items-center gap-3 font-bold text-xs uppercase tracking-widest cursor-pointer mt-6 mb-2 hover:gap-5 transition-all'
              >
                Claim Offer
                <img className="h-3 invert" src={assets.arrowIcon} alt="arrow-icon" />
              </button>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExclusiveOffers;
