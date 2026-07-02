import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import ProtectedRoutes from './components/ProtectedRoutes'; // day 78

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
            {/* day 78  */}
            <Route path='/home' element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            } />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App