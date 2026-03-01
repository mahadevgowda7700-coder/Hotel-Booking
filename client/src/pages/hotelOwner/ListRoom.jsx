import React, { useContext } from 'react';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';

const ListRoom = () => {
  const { rooms, toggleRoomAvailability } = useContext(AppContext);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[85vh]">
      <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit, or manage all listed rooms. Keep the information up to date for the best experience for all users.' />
      <div className="flex items-center justify-between mt-12 mb-6">
        <p className='text-[#001F3F] font-bold uppercase tracking-wider text-sm'>ALL Rooms</p>
        <p className='text-gray-400 text-xs'>{rooms.length} Rooms Listed</p>
      </div>

      <div className='w-full max-w-5xl text-left border border-gray-100 rounded-2xl overflow-hidden shadow-sm'>
        <table className='w-full border-collapse'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-4 px-6 text-[#001F3F] font-bold text-left'>Name</th>
              <th className='py-4 px-6 text-[#001F3F] font-bold text-left max-sm:hidden'>Facility</th>
              <th className='py-4 px-6 text-[#001F3F] font-bold text-left'>Price / night</th>
              <th className='py-4 px-6 text-[#001F3F] font-bold text-center'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm font-medium'>
            {
              rooms.map((item, index) => (
                <tr key={item._id || index} className='hover:bg-gray-50 transition-colors'>
                  <td className='py-4 px-6 text-gray-700 border-t border-gray-100'>
                    {item.roomType}
                  </td>

                  <td className='py-4 px-6 text-gray-500 border-t border-gray-100 max-sm:hidden'>
                    <div className='truncate max-w-[250px]'>
                      {item.amenities.join(', ')}
                    </div>
                  </td>

                  <td className='py-4 px-6 text-gray-700 border-t border-gray-100 font-bold'>
                    ${item.pricePerNight}
                  </td>

                  <td className='py-4 px-6 border-t border-gray-100 text-center'>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type="checkbox"
                        className='sr-only peer'
                        checked={item.isAvailable}
                        onChange={() => toggleRoomAvailability(item._id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                    </label>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListRoom;
