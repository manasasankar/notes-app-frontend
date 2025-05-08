# Notes App 📝

A simple, user-friendly Notes application built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to create, edit, delete, and manage their notes. It offers functionality for adding tags, searching through notes, and managing notes in a recycle bin.

## ✨ Features

- 🆕 **Create Notes**: Easily add new notes with a title and content.
- ✏️ **Edit Notes**: Modify existing notes by updating the title, content, or tags.
- 🗑️ **Delete Notes**: Move notes to the Recycle Bin for easy recovery.
- 🔄 **Restore Notes**: Retrieve notes from the Recycle Bin back to the main list.
- ❌ **Permanently Delete Notes**: Fully remove notes from the app, making them irretrievable.
- 🏷️ **Add Tags**: Assign tags to each note for better categorization and easy searching.
- 🔍 **Search Notes**: Quickly search for notes by title, content, or tags.


```
frontend/
├── src/
│   ├── assets/               
│   │   └── Images/
│   │       ├── add-notes.svg
│   │       ├── no-data.svg
│   │       └── react.svg
│   ├── components/           
│   │   ├── Cards/
│   │   │   ├── NoteCard.jsx
│   │   │   └── ProfileInfo.jsx
│   │   ├── EmptyCard/
│   │   │   └── EmptyCard.jsx
│   │   ├── Input/
│   │   │   ├── PasswordInput.jsx
│   │   │   └── TagInput.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── SearchBar/
│   │   │   └── SearchBar.jsx
│   │   └── ToastMessage/
│   │       └── Toast.jsx
│   ├── pages/               
│   │   ├── Home/
│   │   │   ├── AddEditNotes.jsx
│   │   │   └── Home.jsx
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── RecycleBin/
│   │   │   └── RecycleBin.jsx
│   │   └── SignUp/
│   │       └── SignUp.jsx
│   └── utils/                
│       ├── axiosInstance.js
│       ├── constants.js
│       └── helper.js
├── App.css                  
├── App.jsx                  
├── index.css                 
├── index.html                
├── main.jsx                 
├── .eslintrc.cjs            
├── .gitignore               
├── postcss.config.js        
├── tailwind.config.js        
├── vite.config.js           
└── README.md                 
