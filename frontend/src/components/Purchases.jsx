import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../public/logo.webp";
import { BACKEND_URL } from "../utils/utils";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  console.log("purchases: ", purchases);
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
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const fetchPurchases = async () => {
      if (!token) {
        setErrorMessage("Please login to see your purchases");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/purchases`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );
        setPurchase(response.data.courseData);
      } catch (error) {
        setErrorMessage("Failed to fetch purchase data");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
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
          <Link to="/courses" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-gray-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap">
              <FaDiscourse className="text-lg" />
              <span className="hidden md:inline">Courses</span>
            </div>
          </Link>
          <a href="#" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-orange-400 py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <FaDownload className="text-lg" />
              <span className="hidden md:inline">Purchases</span>
            </div>
          </a>
          <Link to="#" className="flex-1 md:flex-none">
            <div className="flex items-center justify-center md:justify-start space-x-3 w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-gray-300 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap">
              <IoMdSettings className="text-lg" />
              <span className="hidden md:inline">Settings</span>
            </div>
          </Link>

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
            My Purchases
          </h1>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
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
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-center">
              {errorMessage}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-400">Loading your purchases...</p>
            </div>
          ) : purchases.length === 0 && !errorMessage ? (
            <div className="flex flex-col items-center justify-center h-[50vh] bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-600 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400">No purchases yet</h3>
              <p className="text-gray-500 mt-2 text-center">Explore our courses and start learning today!</p>
              <Link to="/courses" className="mt-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white py-2 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20 font-medium">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {purchases.map((purchase, index) => (
                <div
                  key={index}
                  className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30 group flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-900/50 flex-shrink-0">
                    <img
                      src={purchase.image?.url || "https://via.placeholder.com/200"}
                      alt={purchase.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors">
                      {purchase.title}
                    </h2>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                      {purchase.description}
                    </p>

                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10 mb-5">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">₹{purchase.price}</span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 text-center block"
                    >
                      Continue Learning
                    </button>
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

export default Purchases;
