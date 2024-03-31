import React from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.clear(); // Clear localStorage
      console.log('LocalStorage cleared successfully!');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      // Handle error gracefully, e.g., display an error message
    }
  };
  return (
    <div>
      <p className="text-white">Profile</p>
      <button
        onClick={handleLogout}
        className="w-full px-3 py-2 h-12  text-lg  bg-buttonOrigin text-white rounded-3xl hover:bg-activeButton flex justify-center items-center  "
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default UserProfile;
