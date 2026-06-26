import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleAdminClick = () => {
    const adminToken = localStorage.getItem("admin");
    if (adminToken) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

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
      } catch (error) {
        console.log("error in fetchCourses ", error);
      } finally {
        setLoading(false);
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

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let slidesToShow = 4;
  let slidesToScroll = 1;
  let centerMode = false;

  if (windowWidth < 640) {
    slidesToShow = 1;
    slidesToScroll = 1;
    centerMode = false;
  } else if (windowWidth < 768) {
    slidesToShow = 2;
    slidesToScroll = 1;
  } else if (windowWidth < 1024) {
    slidesToShow = 3;
    slidesToScroll = 1;
  }

  const settings = {
    dots: true,
    infinite: courses.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplay: true,
    centerMode: centerMode,
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white font-sans flex flex-col overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full shadow-lg shadow-orange-500/20" />
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 tracking-tight hidden sm:block">
              CourseHaven
            </span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold text-lg">{userName}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md py-2 px-5 rounded-xl transition-all text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 px-3 sm:px-4 rounded-xl hover:bg-white/5"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white py-2 px-5 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content wrapper */}
      <main className="flex-grow container mx-auto px-6 relative z-10">

        {/* Hero Section */}
        <section className="text-center py-20 md:py-32 flex flex-col items-center justify-center">
          <div className="inline-block bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            ✨ Elevate Your Learning Journey
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 mb-6 tracking-tight leading-tight">
            Master New Skills <br className="hidden md:block" /> With CourseHaven
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlock your potential with expert-crafted courses designed for the modern learner. Start building your future today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to={"/courses"}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white font-semibold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Explore Courses
            </Link>
            <button
              onClick={handleAdminClick}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Admin Portal
            </button>
          </div>
        </section>

        {/* Courses Slider Section */}
        <section className="py-10 pb-24">
          <div className="flex items-center justify-between mb-10 px-4">
            <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
            <Link to="/courses" className="text-orange-400 hover:text-orange-300 font-medium text-sm hidden sm:block">View all →</Link>
          </div>

          <div className="px-2 sm:px-0">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : courses.length > 0 ? (
              <Slider
                key={`${windowWidth < 640 ? "sm" : windowWidth < 768 ? "md" : windowWidth < 1024 ? "lg" : "xl"}-${courses.length}`}
                {...settings}
              >
                {courses.map((course) => (
                  <div key={course._id} className="px-2 outline-none">
                    <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30 group max-w-sm mx-auto">
                      <div className="relative h-56 sm:h-48 overflow-hidden bg-gray-900/50">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                          src={course.image?.url || "/imgPL.webp"}
                          alt={course.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 min-h-[3.5rem] group-hover:text-orange-400 transition-colors">
                          {course.title}
                        </h3>
                        <button className="w-full mt-5 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-medium text-sm">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="text-center text-gray-400 py-10">
                No featured courses found.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f1c] border-t border-white/5 pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full shadow-lg shadow-orange-500/20" />
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 tracking-tight">
                CourseHaven
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Empowering learners worldwide with premium educational content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-400 hover:border-blue-400 transition-all">
                <FaTwitter className="text-lg" />
              </a>
            </div>
          </div>

          {/* Connects Col */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Connect With Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">WhatsApp - Tamsil Hashmi</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Telegram - Tamsil Hashmi</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">GitHub - Tamsil Hashmi</a>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Legal Information</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Refund & Cancellation</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>Copyright © {new Date().getFullYear()} CourseHaven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
