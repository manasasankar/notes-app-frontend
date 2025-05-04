import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote, isDeleted }) => {
  return (
    <div
      className={`border rounded-lg p-4 ${
        isDeleted ? 'bg-gray-300' : 'bg-white'
      } hover:shadow-2xl transition-all ease-in-out mx-5 my-6 ${
        isDeleted ? 'line-through' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-medium text-slate-900">{title}</h6>
          <span className="text-sm text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>

        {/* Conditionally apply color to the pin icon */}
        {!isDeleted && (
          <MdOutlinePushPin
            className={`icon-btn cursor-pointer ${
              isPinned ? 'text-blue-500' : 'text-gray-400'
            }`}
            onClick={onPinNote}
          />
        )}
      </div>
      <p className="text-sm text-slate-700 mt-2 whitespace-pre-line">
        {isDeleted
          ? 'This note has been deleted'
          : content?.length > 60
          ? `${content.slice(0, 60)}...`
          : content}
      </p>

      <div className="flex items-center justify-between mt-3">
        {tags?.length > 0 ? (
          <div className="text-xs text-gray-500 flex flex-wrap gap-1">
            {tags.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#60a5fa] text-white rounded-full hover:bg-[#3b82f6] transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-500">No Tags</div>
        )}

        {!isDeleted && (
          <div className="flex items-center gap-2">
            <MdCreate
              className="icon-btn hover:text-green-600 cursor-pointer"
              onClick={onEdit}
            />
            <MdDelete
              className="icon-btn hover:text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
