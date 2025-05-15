import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import Api from '../../Api/Api';
import { toast } from 'react-toastify';
export default function Login() {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch=useDispatch()

    const loginValues={username:"",password:""}
      const[datas,setDatas]=useState(loginValues)
 const handlechange=(e)=>{
    const {value,name}= e.target
    setDatas({...datas,[name]:value.trim()})
  }

   const navigate=useNavigate()
   //user login
  const ValuesSubmit = async () => {
    try {
      const response = await axios.post(`${Api}/login`,datas)
      if (response.data.success) {
       
        localStorage.setItem('usertoken', JSON.stringify(response.data.userDatas.token));
        dispatch(
          addUser({
            id: response.data.userDatas.id,
            username: response.data.userDatas.username,
            token: response.data.userDatas.token,
          })
        );
        navigate('/');
      } 
    } catch (error) {
        if(error.response && error.response.status==401){
toast.error("Email or password is incorrect")
        }else{
console.log(error);
        }
      
    }
  };
  return (
   <div className="sm:h-screen w-full flex justify-center lg:items-center  ">
        <div className="lg:w-[29%] sm:mt-12 bg-white w-[88%] mt-12 md:mb-12 custom-shadow  ">
          <div className="sm:ml-2">
            <p className="text-black font-semibold mt-5 ml-4 text-2xl">LOGIN</p>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-6">
              <p className="w-full text-black text-lg">Email</p>
              <input
               {...register("username", { required: true })}
                type="email"
                name="username"
                onChange={handlechange}
                placeholder="Enter your email"
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
                
              />
              {errors.username && (
                  <span style={{ color: "red" }}>Please fill email</span>
                )}
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-5 ">
              <p className="w-full text-black text-lg">Password</p>
              <input
               {...register("password", { required: true })}
                type="password"
                name="password"
                onChange={handlechange}
                placeholder="••••••••"
                className="w-[92%] sm:w-[90%]   h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              {errors.password && (
                  <span style={{ color: "red" }}>Please fill password</span>
                )}
            </div>
            
            
            <div className=" flex justify-center items-center mt-5 flex-col">
           
              <button className="w-[80%] h-10 rounded-lg text-white border-2 border-black hover:text-black font-bold bg-black hover:bg-[#60cd6d]" onClick={handleSubmit(ValuesSubmit)}>
                LOGIN
              </button>
             
            </div>
            <div className="flex items-center justify-center">
              <hr className="w-full border-t-2 border-gray-200 dark:border-gray-700" />
              <p className="mx-3 text-gray-400 font-bold uppercase">or</p>
              <hr className="w-full border-t-2 border-gray-200 mr-1 dark:border-gray-700" />
            </div>
            
            <p className="text-blue-700 mt-4 ml-12 text-left mb-10 cursor-pointer">
              Need an account?<span onClick={() => navigate("/signup")}>SIGN UP</span>
            </p>
          </div>
        </div>
      </div>
  )
}
