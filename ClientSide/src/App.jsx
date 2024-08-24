import { useContext, useState } from 'react'
import Layout from './pages/Layout'
import Home from './pages/Home'
import { Form } from './pages/Form';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './pages/Details';
import { Auth } from './pages/Auth';

import UserContext from './context/UserContext/UserContext';



function App() {

  const {user} = useContext(UserContext)
  

  return (
    
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <Home /> : <Auth />} />
            <Route path="form" element={<Form />} />
            <Route path="details/:taskid" element={<Details />} />
            <Route path="form/:taskid" element={<Form />} />
            <Route path="auth" element={<Auth />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
  )
}

export default App
