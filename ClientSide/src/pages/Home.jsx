import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';


import { TaskArea } from '../components/TaskArea';

const Home = () => {

    const [data, setData] = useState([])

    const [todoData, setTodoData] = useState([])
    const [inProgressData, setInProgressData] = useState([])
    const [doneData, setDoneData] = useState([])


    const url = 'http://localhost:5000/tasks';

    useEffect(() => {
        async function fetchData () {
          try {
            const { data } = await axios.get(url);
            setData(data)

            const todoD = (data.filter((todo) => {
              return todo.status === "TODO";
            }))

            const inProgD = (data.filter((todo) => {
              return todo.status === "INPROGRESS";
            }))

            const doneD = (data.filter((todo) => {
              return todo.status === "DONE";
            }))

            setTodoData(todoD);
            setInProgressData(inProgD);
            setDoneData(doneD);

            console.log(data);
          } catch (error) {
            console.log(error.message);
          }
        }
      
        fetchData();
      }
        , []);

  return (
    <div className='mx-10'>
      <Link to='/form'><button className='text-white bg-blue-500 p-4 m-4 px-12 rounded-md mt-10'>Add Task</button></Link>

      <div className=' flex flex-row justify-evenly'>
            <div className='w-4/12 bg-white  border-2 border-gray-400 p-3 rounded-2xl m-3'>
                <h1 className='text-white font-bold text-3xl w-full bg-blue-500 p-2'>
                    TODO</h1>
                    {todoData.map((task) => (
                      <TaskArea key={task._id} {...task}/>
                    ))}
            </div>
            <div className='w-4/12 bg-white  border-2 border-gray-400 p-3 rounded-2xl m-3'>
                <h1 className='text-white font-bold text-3xl w-full bg-blue-500 p-2'>
                    IN PROGRESS</h1>
                    {inProgressData.map((task) => (
                      <TaskArea {...task}/>
                    ))}
            </div>
            <div className='w-4/12 bg-white  border-2 border-gray-400 p-3 rounded-2xl m-3'>
                <h1 className='text-white font-bold text-3xl w-full bg-blue-500 p-2'>
                    TODO</h1>
                    {doneData.map((task) => (
                      <TaskArea {...task}/>
                    ))}
            </div>
        </div>
    </div>
  )
}

export default Home