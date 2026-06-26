import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/Login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Login successfull: ", response.data);
      toast.success(response.data.message);
      // localStorage.setItem("user", JSON.stringify(response.data.token));  I change using GPT
      // localStorage.setItem(                                               2nd change using GPT
      //   "user",
      //   JSON.stringify({ token: response.data.token }),
      // );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Login failed!!!");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center text-white font-sans">
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
            to={"/signup"}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5"
          >
            Signup
          </Link>
          <Link
            to={"/courses"}
            className="text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md py-2 px-5 rounded-xl transition-all shadow-lg"
          >
            Join now
          </Link>
        </div>
      </header>

      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md px-6 mt-16">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400">
              Student Portal • Please log in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all text-white placeholder-gray-500 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
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
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
