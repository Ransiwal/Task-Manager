import React from 'react'
import { useState , useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const Form = () => {

    const url = 'http://localhost:5000/tasks';

    const [taskData, setTaskData] = useState({ title: '', description: '', status: 'TODO' });

    const {taskid} = useParams()

    if(taskid){
        async function fetchData () {
          try {
            console.log("ASDADAD")
            const { data } = await axios.get(`${url}/${taskid}`);
            
            console.log(data)
            setTaskData(data)
            
          } catch (error) {
            console.log(error.message);
          }
        }
        console.log("ASDASD")
        fetchData();
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(taskid){
          try {
            const { data } = axios.patch(`${url}/${id}`, updatedPost);
      
          } catch (error) {
            console.log(error.message);
          }  
        }
        else{
          try {
            const { data } = await axios.post(url , taskData)
      
          } catch (error) {
            console.log(error.message);
          }
        }
        setPostData({ title: '', description: ''})
        
        
    }
  return (
    <form className='mt-20' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 p-3 items-center bg-white max-sm:w-5/6 max-w-96 m-auto rounded-lg'>
      <h2 className='text-2xl   text-black'>Creat a Task</h2>
      
      <input value={taskData.title} className='p-3 w-full border-2' type='text' placeholder='Title' onChange={(e) => setTaskData({...taskData , title: e.target.value})}></input>
      <input value={taskData.description} className='p-3 w-full border-2 h-60' type='text' placeholder='Description' onChange={(e) => setTaskData({...taskData , description: e.target.value})}></input>
    
      <button className='py-2 bg-blue-600 h-12 text-white w-full rounded-md'  >SUBMIT</button>
      <Link className='w-full' to="/">
      <button className='py-2 bg-pink-600 h-12 text-xl text-white w-full rounded-md' >Home</button>
      
      </Link>

    </div>
    </form>
  )
}
