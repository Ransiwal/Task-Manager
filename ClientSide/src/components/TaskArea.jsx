import React from 'react'
import moment from 'moment/moment'
import axios from 'axios';
import { Link } from 'react-router-dom';
export const TaskArea = ({_id , title , description , status , createdAt}) => {

  const url = 'http://localhost:5000/tasks';

  const handleDelete = async () => {

    try {
      console.log("deleting")
      await axios.delete(`${url}/${_id}`);

    } catch (error) {
      console.log(error.message);
    }
  }  

  return (
    <div className='bg-blue-100  my-2 text-black'>
    <h1 className='font-bold text-3xl'>{title}</h1>
    <p>{description}</p>

    

    <p className='pt-10'>{moment(createdAt).fromNow()}</p>
    <div className='flex justify-end pt-10 pb-5 gap-2 mr-2'>
      <button className='bg-red-600 text-white p-1 rounded-md ' onClick={handleDelete}>Delete</button>
      <Link  className=' text-white  right-4 top-0' to={`/form/${_id}`} ><button className='bg-blue-400 text-white p-1 rounded-md '>Edit</button></Link>
      
      <button className='bg-blue-600 text-white p-1 rounded-md '>View Details</button>
    </div>
    
</div>
  )
}
