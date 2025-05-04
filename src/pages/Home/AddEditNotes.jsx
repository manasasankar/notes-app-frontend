import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async (note) => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id; 
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title || '');
      setContent(noteData.content || '');
      setTags(noteData.tags || []);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [noteData]);

  const handleAddNote = () => {
    if (!title) {
      setError('Title is required');
      return;
    }

    if (!content) {
      setError('Content is required');
      return;
    }

    setError('');

    if (type === 'edit') {
      editNote(); // Call the editNote function here
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative p-6 bg-white rounded-md">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute top-4 right-4 hover:bg-gray-200 cursor-pointer"
        onClick={onClose}
      >
        <MdClose className="text-lg text-gray-500" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-600">TITLE</label>
        <input
          type="text"
          className="text-2xl text-gray-800 outline-none border-b-2 border-gray-300 focus:ring-2 focus:ring-gray-500"
          placeholder="Go to gym at 6 AM"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs text-gray-600">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-gray-800 outline-none bg-gray-50 p-2 rounded border-2 border-gray-300 focus:ring-2 focus:ring-gray-500"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="text-xs text-gray-600">
          TAGS
          <TagInput tags={tags} setTags={setTags} />
        </label>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="bg-[#60a5fa] text-white font-medium mt-5 p-3 rounded hover:bg-[#3b82f6] transition-all cursor-pointer"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'EDIT' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
