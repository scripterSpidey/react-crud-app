import React, { useRef, useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateSignUpForm } from '../utils/validations';
import { useDispatch,useSelector } from 'react-redux';
import { addUser,removeUser } from '../slices/userSlice';

const SignUpContainer = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [error,setError] = useState('')
    const {userInfo} = useSelector(state=>state.user)
    useEffect(()=>{
        if(userInfo){
            navigate('/profile')
        }
    },[userInfo])
    const dispath = useDispatch();
    const navigate = useNavigate()
    function handleSubmit(){
        const validForm = validateSignUpForm(email,password,confirmPassword,name,image);
        if(validForm) setError(validForm)
        if(validForm=== true){
            console.log('registered');
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('image', image);

            fetch('http://localhost:4500/api/users/register',{
                method: 'POST',
                credentials: "include",
                body:formData
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                if(data.message == 'User already exists'){
                    setError('User already exists.Try another mail')
                }else if (data.message == 'user created'){
                    const{uid,email,name,image} = data
                    setError(true);
                    dispath(addUser({userId:uid,email,name,image}));
                    // navigate('/profile') 
                }else{
                    setError('oops! something went wrong')
                }
            })
            .catch(error=>{
                console.log(error)
                setError('Something went wrong')
            }) 
        }
    }
    console.log(error)
  return (
      <div style={{backgroundColor:"#1a1a1a"}} className=' rounded-lg p-5 flex flex-col items-center border border-black'>
        <div className='m-5 text-3xl'>
            Welcome!
        </div>
        <div>
            <div className='flex mb-3 flex-col'>
                <label className='mb-3' htmlFor="username">User name</label>
                <input 
                    onChange={(e)=>setName(e.target.value)} 
                    className='p-2 text-black rounded' 
                    type="text" id='username' placeholder='user name'/>
            </div>
            <div className='flex mb-3 flex-col'>
                <label className='mb-3' htmlFor="email">Email address</label>
                <input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className='p-2 rounded  text-black' 
                    type="text" id='email' placeholder='email'/>
            </div>
            <div className='flex flex-col mb-3'>
                <label className='mb-3' htmlFor="password">Password</label>
                <input 
                    onChange={(e)=> setPassword(e.target.value)} 
                    className='p-2 rounded  text-black' 
                    type="password" id='password' placeholder='password'/>
            </div>
            <div className='flex flex-col mb-3'>
                <label className='mb-3' htmlFor="confirmPass">Confirm password</label>
                <input 
                    onChange={(e)=> setConfirmPassword(e.target.value)} 
                    className='p-2 rounded  text-black' 
                    type="password" id='confirmPass' placeholder='retype password'/>
            </div>
            <div className='flex flex-col mb-3'>
                <label className='mb-3' htmlFor="image">Profile picture</label>
                <input onChange={(e)=>setImage(e.target.files[0])} className='p-2 rounded ' type="file" id='image' placeholder='retype password'/>
            </div>
            <div className='flex justify-center mt-6'>
                <button onClick={handleSubmit} className='rounded bg-indigo-600 p-2'>Sign Up</button>
            </div>
            {error!=true && <p className='text-red-600'>{error}</p>}
            
        </div>
        <div className='flex '>
            <p>Already have an account? </p><Link to='/login' className='underline' href="">Log in</Link>
        </div>
      </div>
  )
} 

export default SignUpContainer
