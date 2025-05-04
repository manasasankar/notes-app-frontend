import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isShown, onClose]);

  // Prevent rendering if no message is provided
  if (!isShown || !message) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-400 ${
        isShown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative min-w-52 bg-white border shadow-2xl rounded-md ${
          type === 'delete' ? 'border-red-500' : 'border-green-500'
        }`}
        style={{
          marginTop: '-500px', // Moves the toast two times higher from the previous position
        }}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              type === 'delete' ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            {type === 'delete' ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
