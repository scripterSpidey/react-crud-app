import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserTable = (props) => {
    const [searchUser,setSearchUser]  = useState('');
    
    const users = props.users;
    const filteredUsers = users.filter(user=>{
        return (user.email.startsWith(searchUser)|| user.name.startsWith(searchUser))

    })
    function deleteUser(userId){
        console.log(userId)
        fetch('http://localhost:4500/api/admin/deleteUser',{
            method:'PUT',
            body:JSON.stringify({
                userId
            }),
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }

  
    const userRows = filteredUsers.map(user=>{
        return(
            <tr key={user._id} className='text-center'>
                <td className='w-14 h-14'><img src={`http://localhost:4500/server/${user.profileImage}`} alt="" /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <div className='flex justify-around'>
                        <button onClick={()=>deleteUser(user._id)} className='bg-red-600'>
                            delete
                        </button>
                        <Link 
                            to={`/admin/user/${user._id}`}
                            className='rounded-md p-2 bg-indigo-600 ' 
                            >View Profile</Link>
                        
                    </div>
                </td>
            </tr>
        )
    })
  return (
    <div style={{backgroundColor:'#1a1a1a'}} className='p-3 rounded-md' >

        <div className='flex bg-red-400 rounded p-2 justify-around mb-3'>
            <p className='text-2xl'>USER DETAILS</p>
            <input  
                onChange={(e)=>setSearchUser(e.target.value)} 
                className='rounded p-1 text-black' type="text" placeholder='search user' />
        </div>
      <table  className='w-full '>
        <thead>
            <tr >
                <th>Image</th>
                <th>User Name</th>
                <th>email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {userRows}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
