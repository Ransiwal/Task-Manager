import React , {useState , useEffect , useContext} from 'react'


import image from "../assets/image.png"
import { useNavigate } from "react-router-dom"

import UserContext from '../context/UserContext/UserContext'

const Navbar = () => {

  const navigate = useNavigate();

  const {user , setUser} = useContext(UserContext)

  
  const [profile , setProfile] = useState(JSON.parse(localStorage.getItem('profile')))

  function logout() {
    
    localStorage.clear();
    setUser(false);
    setProfile(JSON.parse(localStorage.getItem('profile')))
    
    // window.location.reload(false);
  }


  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('profile')))
    console.log(profile)
    if(profile){
      setUser(true)
      console.log("ASDASDAD")
    }
  }
    , [user]);

  
  return (
    <div className='bg-blue-500 flex flex-row mx-10 justify-around'>
        <div className='flex flex-row gap-5 p-2 hover:cursor-pointer'>
        <img width={40} src={image} alt="image" />
        {/* <h1 className='text-black text-3xl font-bold'>Task Manager</h1> */}
        </div>
        {profile ? <div className='flex gap-2'>
          <img className='h-14 rounded-2xl p-2' src={profile.picture}></img>
          <h1 className='text-black text-3xl font-bold pt-2'>{profile.name}</h1>
        </div>: <></>}
        {user && <button onClick={logout} className='text-white bg-red-600 rounded-md p-2 my-2'>Logout</button>}
    </div>
  )
}

export default Navbar