import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


import { TaskArea } from '../components/TaskArea';
import { ListTasks } from '../components/ListTasks';

const Home = () => {

    const [data, setData] = useState([])

    // const [todoData, setTodoData] = useState([])
    // const [inProgressData, setInProgressData] = useState([])
    // const [doneData, setDoneData] = useState([])


    const url = 'http://localhost:5000/tasks';

    useEffect(() => {
        async function fetchData () {
          try {
            const { data } = await axios.get(url);
            setData(data)

            // const todoD = (data.filter((todo) => {
            //   return todo.status === "TODO";
            // }))

            // const inProgD = (data.filter((todo) => {
            //   return todo.status === "INPROGRESS";
            // }))

            // const doneD = (data.filter((todo) => {
            //   return todo.status === "DONE";
            // }))

            // setTodoData(todoD);
            // setInProgressData(inProgD);
            // setDoneData(doneD);

          } catch (error) {
            console.log(error.message);
          }
        }
      
        fetchData();
      }
        , [data]);


  return (
    <DndProvider backend={HTML5Backend}>
    <div className='mx-10'>
      <Link to='/form'><button className='text-white bg-blue-500 p-4 m-4 px-12 rounded-md mt-10'>Add Task</button></Link>

      <ListTasks data={data} setData={setData} />


    </div>
    </DndProvider>
  )
}

export default Home