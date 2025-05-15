import React, { useState,useEffect } from 'react';
import Nav from '../UserNav/Nav';
import Api from '../../Api/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';
export default function FindAuthorBlog() {
  const [blogs, setBlogs] = useState([]);
const navigate=useNavigate()
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Calculate current blogs to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
// find Author Blogs
const findBlogs=async()=>{
    try {
             const token = localStorage.getItem("usertoken");
        const response=await axios.get(`${Api}/findauthorblog`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
        if(response.data.success){
            setBlogs(response.data.findauthor)
        }
    } catch (error) {
        console.log(error);
        
    }
}

  const DeleteBlog = async(id) => {
    try {
        const response=await axios.put(`${Api}/deleteblog?id=${id}`)
        if(response.data.success){
            toast.success("Blog Deleted")
            findBlogs()
        }
    } catch (error) {
        console.log(error);
        
    }
    
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(blogs,"fghjkl");
  
useEffect(() => {
findBlogs()
}, [])
  return (
    <>
   <div>
    <Nav /> 
   </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Blog Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {blog.category}
              </span>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{blog.content}</p>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => navigate('/editblog',{state:blog})}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() =>DeleteBlog(blog._id) }
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r-md border border-gray-300 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
    <>
    <Footer />
    </>
     </>
  );
}