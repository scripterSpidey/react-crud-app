import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { removeUser } from '../slices/userSlice';
import { removeAdmin } from '../slices/adminSlice';
import { removeUsers } from '../slices/userDataSlice';
const Header = () => {
  
  const {userInfo} = useSelector(state=>state.user);
  const {adminInfo} = useSelector(state =>state.admin)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userInfo);
  function handleLogout(){
    fetch('http://localhost:4500/api/users/logout',{
                method: 'POST',
                credentials: "include",
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                dispatch(removeUser())
                navigate('/')
            })
            .catch(error=>console.log('error from catch',error))
  }

  function adminLogout(){
    fetch('http://localhost:4500/api/admin/logout',{
                method: 'POST',
                credentials: "include",
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                dispatch(removeAdmin())
                dispatch(removeUsers())
                navigate('/admin-login')
            })
            .catch(error=>console.log('error from catch',error))
  }
  return (
    <div style={{backgroundColor:'#1a1a1a'}} className='py-5 px-5 bg-white flex relative '>
      <div className='w-1/2 justify-center flex'>MERN CRUD APP</div>
      {(userInfo && <div className='mr-10 space-x-3 w-1/2 flex items-center justify-end'>
          <p> {userInfo.name}</p>
          <button onClick={handleLogout}   className='rounded-md p-2 bg-indigo-600' >Logout</button>
          <Link to={"/edit-profile"} className='rounded-md p-2 bg-indigo-600' >Edit Profile</Link>
       </div>)}
       {(adminInfo &&
        <button onClick={adminLogout}  className='rounded-md p-2 bg-indigo-600 absolute right-20 bottom-3' > Logout</button>)
        ||(!userInfo && <Link to={"/admin-login"} className='rounded-md p-2 bg-indigo-600 absolute right-20 bottom-3' > Admin Login</Link>)
       }
       
    </div>
  )
}

export default Header
