import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API call
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  console.log("courses: ", courses);  
  // token
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user?.user?.firstName || "");
      } catch (e) {
        console.log(e);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserName("");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };
  
  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white font-sans flex flex-col md:flex-row overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      {/* Sidebar / Topbar */}
      <div className="relative z-20 w-full md:w-72 bg-white/[0.03] backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col items-center md:items-stretch shadow-[4px_0_24px_0_rgba(0,0,0,0.2)] flex-shrink-0">
        <div className="flex flex-col items-center mb-8 md:mb-12 mt-4">
          <div className="relative">
            <img src={logo} alt="Profile" className="rounded-full h-20 w-20 shadow-lg shadow-orange-500/20 border-2 border-white/10" />
            {isLoggedIn && <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-[#0f172a] rounded-full"></div>}
          </div>
          {isLoggedIn && userName && <div className="mt-3 text-lg font-bold text-white">{userName}</div>}
          <h2 className="text-xl font-bold mt-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">CourseHaven</h2>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Student Portal</span>
        </div>
        
        <nav className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 w-full justify-start overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <Link to="/" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-gray-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap">
              <RiHome2Fill className="text-lg" />
              <span className="hidden md:inline">Home</span>
            </div>
          </Link>
          <a href="#" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-orange-400 py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <FaDiscourse className="text-lg" />
              <span className="hidden md:inline">Courses</span>
            </div>
          </a>
          <Link to="/purchases" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-gray-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap">
              <FaDownload className="text-lg" />
              <span className="hidden md:inline">Purchases</span>
            </div>
          </Link>
          <a href="#" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-gray-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap">
              <IoMdSettings className="text-lg" />
              <span className="hidden md:inline">Settings</span>
            </div>
          </a>
          
          <div className="hidden md:block flex-grow pt-8"></div>
          
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 w-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-red-400 py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap"
            >
              <IoLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="flex-1 md:flex-none">
              <div className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <IoLogIn className="text-lg" />
                <span>Login</span>
              </div>
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 md:p-8 bg-white/[0.02] backdrop-blur-md border-b border-white/10 sticky top-0 z-20">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
            Explore Courses
          </h1>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
              />
            </div>
            {isLoggedIn && (
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-white font-semibold text-lg">{userName}</span>
                <div className="flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 p-0.5 shadow-lg shadow-orange-500/20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="h-full w-full bg-[#0f172a] rounded-full flex items-center justify-center">
                    <FaCircleUser className="text-xl text-orange-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Courses Grid */}
        <div className="p-6 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-400">Loading amazing courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-600 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400">No courses available</h3>
              <p className="text-gray-500 mt-2 text-center">Check back later for new learning opportunities!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30 group flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-900/50 flex-shrink-0">
                    <img
                      src={course.image?.url || "/imgPL.webp"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-2 py-1 rounded-md backdrop-blur-md">
                      20% OFF
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors">
                      {course.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                      {course.description}
                    </p>
                    
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10 mb-5">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 line-through">₹5999</span>
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">₹{course.price}</span>
                      </div>
                    </div>

                    <Link
                      to={`/buy/${course._id}`}
                      className="w-full bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 text-center block"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;

