import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';
const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [image,setImage] = useState('');
  const [error,setError] = useState('')
  const {userInfo} = useSelector(state=>state.user);
  
  useEffect(()=>{
    setName(userInfo.name)
    setImage(userInfo.image)
  },[]);

  function handleUpdate(){
    if(name.trim().length<3){
      setError('Invalid User name');
      return;
    }else if(password.trim().length<6){
      setError('Invalid Password')
    }else{
      setError(null);
      const formData = new FormData();
     
      formData.append('password', password);
      formData.append('name', name);
      formData.append('image', image);
      fetch('http://localhost:4500/api/users/profile',{
                method: 'PUT',
                credentials: "include",
                body:formData
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                if(data.message=='profile updated'){
                    dispatch(addUser({
                      name:data.name,
                      email:data.email,
                      image:data.image,
                      userId:data.userId
                    }))

                    navigate('/profile');
                    
                }
            })
            .catch(error=>console.log(error))
    }
  }
  return (
    <div style={{backgroundColor:"#1a1a1a"}} className=' rounded-lg p-5 flex flex-col items-center border border-black'>
      <div className='text-2xl text-red-400'>EDIT PROFILE</div>
      <div>
        <p>User name</p>
        <input className='text-black p-1 rounded-md' onChange={(e)=>setName(e.target.value)} value={name}  type="text" />
      </div>
      <div className='mb-5'>
        <p>Change password</p>
        <input className='text-black p-1 rounded-md' onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" />
      </div>
      <div>
        <p className='mb-2'>Change profile picture</p>
        <input className='rounded' type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className='mt-5'>
        <button onClick={handleUpdate} className=' rounded-md p-2 bg-indigo-600'>UPDATE</button>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default UpdateProfile
