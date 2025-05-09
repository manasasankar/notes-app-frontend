import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd, MdDeleteForever } from 'react-icons/md'; // Added the icon here
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from '../../assets/Images/add-notes.svg';
import NoDataImg from '../../assets/Images/no-data.svg';

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false, // Modal is not shown by default
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });

  const [allNotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditNote({
      isShown: true,
      type: 'edit',
      data: noteDetails,
    });
  };

  const handleAddNote = () => {
    setOpenAddEditNote({
      isShown: true,
      type: 'add',
      data: null,
    });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',
      type: 'add',
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      } else {
        console.error('An error occurred:', error.message || error);
      }
    }
  };

  const getAllNotes = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data && response.data.notes) {
        const activeNotes = response.data.notes.filter(note => !note.isDeleted); // Filter non-deleted notes
        setAllNotes(activeNotes);
        setFilteredNotes(activeNotes); // Set filtered notes to active notes only
      }
    } catch (error) {
      console.error('An error occurred:', error.message || error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.put(`/soft-delete-note/${noteId}`);
  
      if (response.data && !response.data.error) {
        showToastMessage('Note Deleted Successfully', 'delete');
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log('Something went wrong');
      }
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        "isPinned": !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchNote = async (query) => {
    if (!query) {
      getAllNotes(); // reset to all notes
      return;
    }
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setFilteredNotes(response.data.notes); // ✅ this is the important fix
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Add the "Go to Recycle Bin" button below the Navbar */}
      <div className="container mx-auto mt-4 flex justify-end">
        <button
          className="bg-gray-200 px-4 py-2 rounded-md flex items-center space-x-1 mr-4 cursor-pointer" // Adjusted spacing and added margin-right
          onClick={() => navigate('/recycle-bin')}
        >
          <MdDeleteForever className="text-lg text-gray-700" />
          <span>Trash</span>
        </button>
      </div>

      <div className="container mx-auto">
        {loading ? ( // Show a loading spinner while fetching notes
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading notes...</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {filteredNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => {
                  deleteNote(item);
                }}
                onPinNote={() => { updateIsPinned(item); }}
                className="bg-gray-100 border-gray-300 shadow-md" // Minimalist card background
                searchQuery={searchQuery}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={isSearch ? `No results found for your search.`:`Start Creating your first note, click the add button to get started. Add your ideas, put a tag to it.`}
            className="bg-gray-100 text-gray-600" // Minimalist empty card
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-200 hover:bg-gray-300 absolute right-10 bottom-10 cursor-pointer"
        onClick={handleAddNote}
      >
        <MdAdd className="text-[32px] text-gray-700" />
      </button>

      <Modal
        isOpen={openAddEditNote.isShown}
        onRequestClose={() => {
          setOpenAddEditNote({
            isShown: false,
            type: 'add',
            data: null,
          });
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll" // Minimalist modal
      >
        <AddEditNotes
          type={openAddEditNote.type}
          noteData={openAddEditNote.data}
          onClose={() => {
            setOpenAddEditNote({
              isShown: false,
              type: 'add',
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
        className="bg-gray-200 text-gray-800" // Minimalist toast
      />
    </>
  );
};

export default Home;
