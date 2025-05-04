import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ onSearchNote, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md"> {/* Minimalist with white and subtle shadow */}
      <h1 className="text-xl font-semibold text-gray-800">Notes App</h1> {/* Dark gray text for a clean look */}

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={() => {
          setSearchQuery("");
          onSearchNote(""); // Trigger to fetch all notes
        }}
      />

      <ProfileInfo name={user?.name} onLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;
