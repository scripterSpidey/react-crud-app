import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = () => {
  const {adminInfo} = useSelector(state=>state.admin);
  return adminInfo? <Outlet/> : <Navigate to='/admin-login'/>
}

export default AdminPrivateRoute
