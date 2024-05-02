import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from 'react';;
import { validateSignInForm } from '../utils/validations';
import { addUser,removeUser } from '../slices/userSlice';
// import { useLoginMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';

const LoginContainer = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state=>state.user)

    useEffect(()=>{
        if(userInfo){
            navigate('/profile')
        }
    },[userInfo])
    console.log(userInfo)
    function handleLogin(){
        const validForm = validateSignInForm(email,password)
        setError(validForm);
        if(validForm===true){
            fetch('http://localhost:4500/api/users/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials: "include",
                body:JSON.stringify({
                    email,password
                })
            })
            .then(response=>response.json())
            .then(data=>{
                // console.log(data)
                if(data.message=='Invalid credentials'){
                    setError(data.message)
                }else{
                    setError(true);
                    dispatch(addUser({...data}))
                    navigate('/profile')
                }
            })
            .catch(error=>console.log('error from catch',error))
        }
    }
   
  return (
      <div style={{backgroundColor:"#1a1a1a"}} className=' rounded-lg p-5 flex flex-col items-center border border-black'>
        <div className='m-5 text-3xl'>
            Welcome!
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
                <button onClick={handleLogin} className='rounded bg-indigo-600 p-2'>Log in</button>
            </div>
            {error!=true && <p className='text-red-600'>{error}</p>}
        </div>
        <div className='flex '>
            <p>Dont have an account? </p> <Link to='/register' className='underline' href=""> sign up</Link>
        </div>
      </div>
  )
}

export default LoginContainer
