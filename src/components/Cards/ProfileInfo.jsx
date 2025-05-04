import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ name, onLogout }) => {
  console.log("Name prop in ProfileInfo:", name);

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(name || "user")} {/* Fallback to "User" if username is not available */}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">{name || "User"}</p>
        <button className="text-sm text-slate-600 hover:text-slate-800 underline cursor-pointer" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
