import React, { useState } from 'react'
import { useEffect } from 'react'
import UserTable from './UserTable';
import { setAllUsers } from '../slices/userDataSlice';
import { useDispatch } from 'react-redux';

const AdminDashboard = () => {
  const [users,setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    fetch('http://localhost:4500/api/admin/dashboard',{
      method:'GET',
      credentials:'include'
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      dispatch(setAllUsers(data))
      setUsers(data)
    })
    .catch(error=>console.log(error))
  },[])
  // console.log(users)
  return (
    <div className='w-3/5'>
      <UserTable users={users}/>
    </div>
  )
}

export default AdminDashboard
