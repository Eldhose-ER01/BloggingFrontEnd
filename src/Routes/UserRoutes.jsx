import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import UserSignup from "../Pages/Users/UserSignup";
import UserLogin from '../Pages/Users/UserLogin';
import Home from '../Pages/Users/Home';
import AddnewBlog from '../Pages/Users/AddnewBlog';
import FindAuthorBolges from '../Pages/Users/FindAuthorBolges';
import EditBlogs from '../Pages/Users/EditBlogs';
import ProtectedRoute from './ProtectedRoute';
export default function UserRoutes() {
  return (
    <div>
      <Routes>
          <Route path="/login" element={<UserLogin />}/>
        <Route element={<ProtectedRoute/>}>
    <Route path="/signup" element={<UserSignup />}/>
  
    <Route path='/'element={<Home/>}/>
    <Route path='/addblog'element={<AddnewBlog />}/>
    <Route path='/viewblog'element={<FindAuthorBolges/>}/>
    <Route path='/editblog'element={<EditBlogs/>}/>
     </Route>
</Routes>
    </div>
  )
}




