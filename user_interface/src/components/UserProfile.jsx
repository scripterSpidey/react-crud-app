import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { addUser } from '../slices/userSlice';
import { useEffect } from 'react';
const UserProfile = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [image,setImage] = useState('')
  const {userInfo} = useSelector(state=>state.user);
  
  useEffect(()=>{
    setName(userInfo.name)
    setEmail(userInfo.email)
    setImage(userInfo.image)
  },[])
  // console.log(userInfo.image)
  return (
    <div style={{backgroundColor:"#1a1a1a"}} className=' rounded-lg p-5 flex flex-col w-1/2 items-center border border-black'>
      <div className='flex flex-col w-full space-y-4'>
        <div className='text-3xl'>{name}</div>
        <div className='text-xl'>{email}</div>
        <div>
          {/* <p>{image}</p> */}
          <img src={`http://localhost:4500/server/${image}`} alt="profile_image" />
        </div>
      </div>
    </div>
  )
}
 
export default UserProfile
