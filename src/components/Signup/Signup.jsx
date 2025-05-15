import React from 'react'
import { useState } from "react";
import axios from'axios'
import Api from '../../Api/Api';
import { useForm } from 'react-hook-form';
import '../style.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
/*Using Error Validation*/
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();   
  const navigate = useNavigate();
  const userData = {
    fname: "",
    email: "",
    password: "",
    
  };
   const [details, setDetails] = useState(userData);

   const handleChange = (e) => {
  const { name, value } = e.target;
  setDetails({ ...details, [name]: value.trim() }); 
}

   // All data is submitted from the server.
   const DetailsSubmitted=async()=>{
    try {
      const response=await axios.post(`${Api}/signup`,details)
      if(response.data.success){
        toast.success("Signup Successfull")
      }
      navigate("/login")
    } catch (error) {
if (error.response && error.response.status === 409) {
  toast.error("Email already exists")
}else{
  console.log(error);
  
}
   }
  }
  return (
      <div className="sm:h-screen w-full flex justify-center sm:items-center">
        <div className="lg:w-[29%] sm:mt-2 bg-white w-[88%] mt-6 custom-shadow sm:mb-0">
          <div className="sm:ml-2">
            <p className="text-black font-semibold mt-2 ml-4 text-2xl">
              Signup
            </p>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3">
              <p className="w-full text-black text-lg">Full Name</p>
              <input
             {...register("fname", { required: true })}
                type="text"
                placeholder="Enter your first Name"
                name="fname"
                value={details.fname}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
               {errors.fname && <span className="text-red-700 text-[15px] flex justify-center">Please fill the username</span>}
             
            </div>
         
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3 flex flex-col">
              <p className="w-full text-black text-lg">Email</p>
              <input
               {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
               {errors.email && <span className="text-red-700 text-[15px] flex justify-center">Please fill the Email</span>}

            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3 ">
              <p className="w-full text-black text-lg">Password</p>
              <input
               {...register("password", { required: true })}
                type="password"
                placeholder="••••••••"
                name="password"
                value={details.password}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]   h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
                {errors.password && <span className="text-red-700 text-[15px] flex justify-center">Please fill the Email</span>}

            </div>
           
            <div className="flex justify-center items-center mt-3 flex-col mr-2">
              <button
                className="w-[85%] h-10 rounded-lg text-white hover:text-black font-bold bg-black hover:bg-[#60cd64]"
                onClick={handleSubmit(DetailsSubmitted)}
              >
                Sign up
              </button>
            </div>
            <p className="text-blue-700 mt-4 ml-12 text-left mb-10">
              Have an Account?
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Login Here
              </span>
            </p>
          </div>
        </div>
      </div>
  )
}
