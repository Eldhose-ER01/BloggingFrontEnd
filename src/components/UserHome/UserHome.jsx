import React, { useState, useEffect } from 'react';
import Nav from '../UserNav/Nav';
import axios from 'axios';
import Api from '../../Api/Api';
import Footer from '../Footer/Footer';

export default function UserHome() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogdata, setblogdata] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  
  const findAllblogs = async (selectedCategory = 'All') => {
    try {
      setLoading(true);
      const response = await axios.get(`${Api}/findallblogs`, {
        params: { category: selectedCategory }
      });

      if (response.data.success) {
        setblogdata(response.data.finddatas || []);

        // Extract categories only from all data
        if (selectedCategory === 'All') {
          const uniqueCategories = ['All', ...new Set(
            response.data.finddatas.map(blog => blog?.category).filter(Boolean)
          )];
          setCategories(uniqueCategories);
        }
      }
    } catch (error) {
      console.log(error);
      setblogdata([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findAllblogs(); // Load all blogs on mount
  }, []);

  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button 
          className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-md shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row pt-16">
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform fixed md:static inset-y-0 left-0 w-64 bg-white shadow-md md:shadow-none z-40 transition-transform duration-300 ease-in-out md:h-full`}>
            <div className="p-6 h-full flex flex-col">
            

              {/* Categories */}
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setActiveCategory(category);
                          findAllblogs(category);
                          setSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md transition ${activeCategory === category ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading...</p>
                </div>
              ) : blogdata.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 text-lg">No posts found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {blogdata.map(blog => (
                    <article key={blog._id || Math.random()} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img 
                        src={blog?.image} 
                        alt={blog?.title}
                        className="w-full h-48 object-cover"
                      />
                      
                      <div className="p-2">
                        <span className='pl-2 '>
                            {blog?.author.name}
                          </span>
                        <div className="flex items-center text-sm text-gray-500 mb-2 mt-2" >
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md mr-3 text-xs font-medium">
                            {blog?.category}
                          </span>
                          <span>
                            {blog?.createdAt
                              ? new Date(blog.createdAt).toLocaleString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  second: 'numeric',
                                  hour12: true
                                })
                              : 'No date'}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-3">{blog?.title}</h2>
                        <p className="text-gray-600 mb-4">
                          {blog?.content}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}
