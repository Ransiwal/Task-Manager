import { useState } from 'react'
import Layout from './pages/Layout'
import Home from './pages/Home'
import { Form } from './pages/Form';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './pages/Details';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="form" element={<Form />} />
            <Route path="details/:taskid" element={<Details />} />
            <Route path="form/:taskid" element={<Form />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
