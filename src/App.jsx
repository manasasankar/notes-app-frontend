import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import RecycleBin from './pages/RecycleBin.jsx/RecycleBin'; // Adjust paths accordingly

import Modal from 'react-modal';

// Set the app element for react-modal
Modal.setAppElement('#root');


const routes =(
  <Router>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/recycle-bin" element={<RecycleBin />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      
    </Routes>
  </Router>
);
const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
