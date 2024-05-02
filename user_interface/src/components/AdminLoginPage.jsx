import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { validateSignInForm } from '../utils/validations';
import { addAdmin } from '../slices/adminSlice';

const AdminLoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {adminInfo} = useSelector(state=>state.admin);
    useEffect(()=>{
        
        if(adminInfo) navigate('/admin/dashboard')
    })
    function handleLogin(){
        const validForm = validateSignInForm(email,password);
        setError(validForm);

        if(validForm===true){
            fetch('http://localhost:4500/api/admin/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials: "include",
                body:JSON.stringify({
                    email,password
                })
            })
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                console.log(data)
                if(data.message=='Invalid credentials'){
                    setError(data.message)
                }else{
                    setError(true);
                    dispatch(addAdmin({name:data.name,email:data.email}))
                    navigate('/admin/dashboard')
                }
            })
            .catch(error=>console.log('error from catch',error))
        }
    }
  return (
    <div style={{backgroundColor:"#1a1a1a"}} className=' rounded-lg p-5 flex flex-col items-center border border-black'>
        <div className='m-5 text-3xl text-red-500'>
            ADMIN LOGIN
        </div>
        <div>
            <div className='flex mb-3 flex-col'>
                <label className='mb-3' htmlFor="email">Email address</label>
                <input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className='p-2 rounded text-black' type="text" id='email' placeholder='email'/>
            </div>
            <div className='flex flex-col mb-3'>
                <label className='mb-3' htmlFor="password">Password</label>
                <input 
                    onChange={(e)=>setPassword(e.target.value)} 
                    className='p-2 rounded text-black' type="password" id='password' placeholder='password'/>
            </div>
            <div className='flex justify-center mt-6'>
                <button onClick={handleLogin}  className='rounded bg-indigo-600 p-2'>Log in</button>
            </div>
            {error!=true && <p className='text-red-600'>{error}</p>}
        </div>
      </div>
  )
}

export default AdminLoginPage
