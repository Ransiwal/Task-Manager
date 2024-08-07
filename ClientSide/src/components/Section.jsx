import React , {useState , useEffect} from 'react'
import { TaskArea } from './TaskArea';
import { useDrop } from 'react-dnd'
import axios from 'axios';


export const Section = ({status , todoData , inProgressData , doneData , setData}) => {

    const url = 'http://localhost:5000/tasks';

    let CurrTaskId = "";

    const [currTask, setCurrTask] = useState({ title: '', description: '', status: '' });

   
 

    let tasktoMap = todoData;

    if(status === "INPROGRESS"){
        tasktoMap = inProgressData
    }

    if(status === "DONE"){
        tasktoMap = doneData
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop : (item) =>{
            CurrTaskId = item.id;
             addItemToSection(item._id
            )},
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
      }))

      const addItemToSection = (id) => {
        let task = {};
        async function fetchData () {
            try {
              const { data } = await axios.get(`${url}/${id}`);
              task = data
              console.log(id)
              console.log(task)
              task.status = status
                    console.log("ASASFASF")
                    console.log(task);
                
            const { x } = axios.patch(`${url}/${id}`, task);
            //   setCurrTask(data)
            } catch (error) {
              console.log(error.message);
            }
          }
          async function updateTask () {
            task.status = status
                    console.log("ASASFASF")
                    console.log(task)
                try {
                    // setCurrTask({
                    //     ...currTask ,
                    //     status : {status}
                    // }
                    // )
                    
            const { data } = axios.patch(`${url}/${id}`, currTask);
      
          } catch (error) {
            console.log(error.message);
          }  
          }
        
          fetchData();
          
        updateTask();
        
      }

  return (
    
    <div ref={drop} className={`w-4/12 bg-white  border-2 border-gray-400 p-3 rounded-2xl m-3 ${isOver ? "bg-slate-200" : ""} `}>
                <h1 className='text-white font-bold text-3xl w-full bg-blue-500 p-2'>
                    {status}</h1>
                    {tasktoMap.map((task) => (
                      <TaskArea key={task._id} {...task}/>
                    ))}
            </div>
  )
}
