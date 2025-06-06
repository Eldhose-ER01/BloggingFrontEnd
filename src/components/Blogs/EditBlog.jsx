import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Api from '../../Api/Api';
import { toast } from 'react-toastify';
import Nav from '../UserNav/Nav';

export default function EditBlog() {
    const location = useLocation();
    const blogs = location.state || {};
    const navigate=useNavigate()
   
    // Initialize form with blog data
    const [formData, setFormData] = useState({
    _id: blogs._id || '',
    title: blogs.title || '',
    category: blogs.category || '',
    content: blogs.content || '',
    image: blogs.image || ''
});

    
    console.log(formData,"formData");
    
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "kesrrxni");
        
        try {
            const response = await Axios.post(
                "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const imageUrl = await uploadImageToCloudinary(file);
            setFormData(prev => ({
                ...prev,
                image: imageUrl
            }));
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload image");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isUploading) {
            toast.warning("Please wait for image upload to complete");
            return;
        }

        try {
            const token = localStorage.getItem("usertoken");
            const response = await Axios.put(`${Api}/editblog`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                toast.success("Blog updated successfully");
                navigate('/viewblog');
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error(error.response?.data?.message || "Failed to update blog");
        }
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-5">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold text-gray-800">Edit Blog Post</h1>
                        <p className="mt-1 text-sm text-gray-500">Update your blog content</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-xs font-medium text-gray-600 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Post title"
                                required
                            />
                        </div>

                        {/* Category Field */}
                        <div>
                            <label htmlFor="category" className="block text-xs font-medium text-gray-600 mb-1">
                                Category *
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="e.g. Technology, Food, Travel"
                                required
                            />
                        </div>

                        {/* Content Field */}
                        <div>
                            <label htmlFor="content" className="block text-xs font-medium text-gray-600 mb-1">
                                Content *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Write your content here..."
                                required
                            />
                        </div>

                        {/* Image Upload Field */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Featured Image
                            </label>
                            <div className="mt-1">
                                {formData.image && (
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                                        <img 
                                            src={formData.image} 
                                            alt="Current blog" 
                                            className="w-full h-40 object-cover rounded border border-gray-300"
                                        />
                                    </div>
                                )}
                                <label className="flex flex-col items-center justify-center w-full p-3 border border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-xs text-gray-500">
                                            <span className="text-blue-500">Click to upload new image</span> or drag and drop
                                        </p>
                                        {isUploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                                        {formData.image && !isUploading && (
                                            <p className="text-xs text-green-500 mt-1">Current image will be kept if no new image is selected</p>
                                        )}
                                    </div>
                                    <input 
                                        id="image" 
                                        name="image" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={isUploading}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                                disabled={isUploading}
                            >
                                {isUploading ? 'Updating...' : 'Update Blog'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}