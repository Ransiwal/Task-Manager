import React, { useState , useEffect } from 'react'
import { TaskArea } from './TaskArea'
import { useDrop } from 'react-dnd'
import { Section } from './Section'

export const ListTasks = ({data , setData}) => {

    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: "task",
    //     drop : (item) => addItemToSection(item._id),
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver()
    //     })
    //   }))

    //   const addItemToSection = (id) => {
    //     console.log("dropped" , id , data.status)
    //   }

    const [todoData, setTodoData] = useState([])
    const [inProgressData, setInProgressData] = useState([])
    const [doneData, setDoneData] = useState([]) 

    useEffect(() => {
        async function fetchData () {
          try {
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

          } catch (error) {
            console.log(error.message);
          }
        }
      
        fetchData();
      }
        , [data]);

    const statuses = ["TODO" , "INPROGRESS" , "DONE"]


      

  return (
    <div  className=' flex flex-row justify-evenly'>
        {statuses.map(status => (
            <Section key={status} status = {status} todoData = {todoData} inProgressData={inProgressData}
            doneData={doneData} setData={setData} />
        ))}
            {/* <div className='w-4/12 bg-white  border-2 border-gray-400 p-3 rounded-2xl m-3'>
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
            </div> */}
        </div>
  )
}
