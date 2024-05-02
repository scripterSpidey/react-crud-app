import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div style={{backgroundColor:'#1a1a1a'}} className='p-7 w-3/6 flex flex-col rounded-lg space-y-8 items-center'>
      <div className='text-3xl'>WELCOME!</div>
      <div className='flex justify-between  w-2/5'>
        <Link to='/login' className='bg-indigo-600 p-2 rounded'>SIGN IN</Link>
       
        <Link to='/register' className='bg-indigo-600 p-2 rounded'>SIGN UP</Link>
      </div>
    </div>
  )
}

export default Home
