import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setAllUsers } from '../slices/userDataSlice';
import { updateUser } from '../slices/userDataSlice';

const ViewProfile = () => {
    const {userDatas} = useSelector(state=>state.userDatas)
    const {userId} = useParams()
    const user = userDatas.filter(user=>user._id==userId)[0]
    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)

    const dispatch = useDispatch()

    function updateUser(){
        fetch('http://localhost:4500/api/admin/user/updateProfile',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                email:email,
                userId
            }),
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch(setAllUsers(data))
            
        })
        .catch(err=>console.log(err))
    }
  return (
    <div style={{backgroundColor:"#1a1a1a"}} className=' rounded-lg p-5 flex flex-col w-1/2 items-center border border-black'>
      <div className='flex flex-col w-full space-y-4'>
        <div className='text-3xl'>{user.name}</div>
        <input
            onChange={(e)=>setName(e.target.value)} 
            className='text-black p-2' type="text" value={name} />
        <div className='text-xl'>{user.email}</div>
        <input 
             onChange={(e)=>setEmail(e.target.value)}
            className='text-black p-2' type="text" value={email} />
        <div className='flex justify-around items-center'>
          <img className='w-1/2' src={`http://localhost:4500/server/${user.profileImage}`} alt="profile_image" />
          <button
             onClick={updateUser}
            className='rounded-md p-2 bg-indigo-600 h-14 '>Update Details</button>
        </div>
      </div>
    </div>
  )
}   

export default ViewProfile
