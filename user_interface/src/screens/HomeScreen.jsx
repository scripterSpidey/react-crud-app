import React from 'react';
import LoginContainer from '../components/LoginContainer';
import { Routes,Route } from 'react-router-dom';
import SignUpContainer from '../components/SignUpContainer';
import Home from '../components/Home';
import PrivateRoute from '../components/PrivateRoute';
import PageNotFound from '../components/404';
import UserProfile from '../components/UserProfile';
import UpdateProfile from '../components/UpdateProfile';
import AdminLoginPage from '../components/AdminLoginPage';
import AdminDashboard from '../components/AdminDashboard';
import AdminPrivateRoute from '../components/AdminPrivateRoute';
import ViewProfile from '../components/ViewProfile';
const HomeScreen = () => {
  return (
    <div className='flex justify-center h-screen flex-1 items-center'>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/login" element={<LoginContainer/>}/>
            <Route path="/register" element={<SignUpContainer/>}/>
            <Route path='/admin-login' element={<AdminLoginPage/>}/>
            <Route path='' element={<AdminPrivateRoute/>}>
              <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
              <Route path='/admin/user/:userId' element={<ViewProfile/>}/>
            </Route>
            <Route path='' element={<PrivateRoute/>}>
              <Route path='/profile' element={<UserProfile/>}/>
              <Route path="/edit-profile" element={<UpdateProfile/>}/>
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
    </div>
  
  )
}

export default HomeScreen
