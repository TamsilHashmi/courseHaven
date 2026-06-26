import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.webp";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const adminStr = localStorage.getItem("admin");
    if (!adminStr) {
      toast.error("Please login to admin dashboard");
      navigate("/admin/login");
    } else {
      try {
        const admin = JSON.parse(adminStr);
        setAdminName(admin?.admin?.firstName || "");
      } catch (e) {
        console.log(e);
      }
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white font-sans flex flex-col md:flex-row overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      {/* Sidebar / Topbar */}
      <div className="relative z-20 w-full md:w-72 bg-white/[0.03] backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col items-center md:items-stretch shadow-[4px_0_24px_0_rgba(0,0,0,0.2)] flex-shrink-0">
        <div className="flex flex-col items-center mb-8 md:mb-12 mt-4">
          <div className="relative">
            <img src={logo} alt="Profile" className="rounded-full h-20 w-20 shadow-lg shadow-blue-500/20 border-2 border-white/10" />
            <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-[#0f172a] rounded-full"></div>
          </div>
          {adminName && <div className="mt-3 text-lg font-bold text-white">{adminName}</div>}
          <h2 className="text-xl font-bold mt-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Admin Portal</h2>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Active Session</span>
        </div>
        
        <nav className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 w-full justify-center md:justify-start overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <Link to="/admin/our-courses" className="flex-1 md:flex-none">
            <button className="w-full bg-white/5 hover:bg-blue-600/50 border border-white/10 hover:border-blue-500/50 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course" className="flex-1 md:flex-none">
            <button className="w-full bg-white/5 hover:bg-purple-600/50 border border-white/10 hover:border-purple-500/50 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap">
              Create Course
            </button>
          </Link>
          <Link to="/" className="flex-1 md:flex-none">
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap">
              Home
            </button>
          </Link>
          <div className="hidden md:block flex-grow"></div>
          <button
            onClick={handleLogout}
            className="md:mt-auto w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-[0_0_15px_rgba(220,38,38,0.3)] whitespace-nowrap"
          >
            Logout Securely
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8 overflow-y-auto">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-center max-w-lg w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.039.408-.408A2.652 2.652 0 009.815 6.425l-2.062 2.062a2.652 2.652 0 003.667 3.667l.408-.408 3.039-2.492m-7.07 7.07a2.652 2.652 0 01-3.667 0l-4.242-4.242a2.652 2.652 0 010-3.667l4.242-4.242a2.652 2.652 0 013.667 0l1.414 1.414a2.652 2.652 0 010 3.667l-1.414-1.414a2.652 2.652 0 01-3.667 0" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">System Dashboard</h1>
          <p className="text-gray-400">
            Welcome to the centralized admin control panel. Select an action from the menu to manage courses and users.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
