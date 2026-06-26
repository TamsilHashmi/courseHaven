import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("SignUp successfull: ", response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup failed!!!");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center text-white font-sans py-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20">
        <div className="flex items-center space-x-3">
          <Link to={"/"} className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full shadow-lg shadow-orange-500/20" />
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 tracking-tight hidden sm:block">
              CourseHaven
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={"/login"}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            to={"/courses"}
            className="text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md py-2 px-5 rounded-xl transition-all shadow-lg"
          >
            Join now
          </Link>
        </div>
      </header>

      {/* Signup Form Container */}
      <div className="relative z-10 w-full max-w-md px-6 mt-16">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-gray-400">
              Student Portal • Join CourseHaven today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all text-white placeholder-gray-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all text-white placeholder-gray-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="name@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all text-white placeholder-gray-500 pr-12"
                  placeholder="••••••••"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center backdrop-blur-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
