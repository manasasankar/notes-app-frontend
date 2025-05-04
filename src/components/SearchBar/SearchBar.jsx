import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-white rounded-md border border-gray-300"> 
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none text-gray-700" 
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-xl text-gray-500 cursor-pointer hover:text-black mr-3"  
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-gray-500 cursor-pointer hover:text-black" 
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
