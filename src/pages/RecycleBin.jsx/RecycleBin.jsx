import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import NoteCard from '../../components/Cards/NoteCard';
import Toast from '../../components/ToastMessage/Toast';

const RecycleBin = () => {
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [toast, setToast] = useState({ isShown: false, message: '', type: '' });

  const fetchDeletedNotes = async () => {
    try {
      const res = await axiosInstance.get('/get-deleted-notes');
      setDeletedNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async (noteId) => {
    try {
      await axiosInstance.put(`/restore-note/${noteId}`);
      setToast({ isShown: true, message: 'Note Restored Successfully!', type: 'success' });

      // Remove the restored note from the deletedNotes list
      setDeletedNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermanentDelete = async (noteId) => {
    try {
      await axiosInstance.delete(`/delete-note-permanently/${noteId}`);
      setToast({ isShown: true, message: 'Note Deleted Permanently!', type: 'delete' });

      // Remove the permanently deleted note from the list
      setDeletedNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseToast = () => setToast({ isShown: false, message: '', type: '' });

  useEffect(() => {
    fetchDeletedNotes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recycle Bin</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deletedNotes.map(note => (
          <div key={note._id} className="bg-gray-100 border border-gray-300 p-4 rounded-md shadow-sm">
            <NoteCard
              title={note.title}
              date={note.createdOn}
              content={note.content}
              tags={note.tags}
              isRecycleBin={true}
            />
            <div className="flex justify-between mt-2">
              <button
                className="bg-[#60a5fa] text-white px-3 py-1 rounded-md text-sm hover:bg-[#3b82f6] transition-colors cursor-pointer"
                onClick={() => handleRestore(note._id)}
              >
                Restore
              </button>
              <button
                className="bg-[#60a5fa] text-white px-3 py-1 rounded-md text-sm hover:bg-[#3b82f6] transition-colors cursor-pointer"
                onClick={() => handlePermanentDelete(note._id)}
              >
                Delete Forever
              </button>
            </div>
          </div>
        ))}
      </div>

      <Toast
        isShown={toast.isShown}
        message={toast.message}
        type={toast.type}
        onClose={handleCloseToast}
        className="bg-gray-200 text-gray-800"
      />
    </div>
  );
};

export default RecycleBin;
