import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Details = () => {


    const url = 'http://localhost:5000/tasks';

    const [taskData, setTaskData] = useState({ title: '', description: '', status: 'TODO' });

    const {taskid} = useParams()

      useEffect(() => {
        async function fetchData () {
          try {
            const { data } = await axios.get(`${url}/${taskid}`);
            setTaskData(data)
          } catch (error) {
            console.log(error.message);
          }
        }
      
        fetchData();
      }
        , []);


  return (
    <div className='m-24   border-blue-200 border-4 flex flex-col  p-20 gap-12'>
        <h1 className='text-6xl font-bold'>TASK DETAILS</h1>
        <h1 className='text-5xl '>Title : {taskData.title}</h1>
        <h1 className='text-4xl text-gray-600'>Description : {taskData.description}</h1>
        <h1 className='text-3xl text-gray-600'>Created at : {taskData.createdAt}</h1>
        
        <Link className='pt-52' to="/">
      <button className='py-2 bg-pink-600 h-12 text-xl text-white w-full rounded-md' >Home</button>
      
      </Link>
    </div>
  )
}
