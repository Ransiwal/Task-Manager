import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import UserContext from '../context/UserContext/UserContext';


import { ListTasks } from '../components/ListTasks';
import { Auth } from './Auth';


const Home = () => {
  const { user } = useContext(UserContext)

  const [data, setData] = useState([])


  const url = 'http://localhost:5000/tasks';

  useEffect(() => {

    if (user) {
      async function fetchData() {
        try {
          const { data } = await axios.get(url);
          setData(data)


        } catch (error) {
          console.log(error.message);
        }
      }

      fetchData();
    }
  }
    , [data]);


  return (
    <DndProvider backend={HTML5Backend}>
      <div className='mx-10'>

        {user ? <>
            <Link to='/form'><button className='text-white bg-blue-500 p-4 m-4 px-12 rounded-md mt-10'>Add Task</button></Link>
            <ListTasks data={data} setData={setData} />
          </>
          : <Auth />}

      </div>
    </DndProvider>
  )
}

export default Home