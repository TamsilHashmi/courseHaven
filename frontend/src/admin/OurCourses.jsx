import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  if (!token) {
    toast.error("Please login to admin");
    navigate("/admin/login");
  }

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`,
          {
            withCredentials: true,
          },
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

  // delete courses code
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      toast.success(response.data.message);
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.log("Error in deleting course ", error);
      toast.error(error.response.data.errors || "Error in deleting course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden p-6 md:p-10">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none "></div>
      <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none "></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Manage Courses</h1>
            <p className="text-gray-400 text-sm mt-1">View, update, or delete existing courses.</p>
          </div>
          <Link
            className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-6 rounded-xl transition-all duration-300 shadow-sm"
            to={"/admin/dashboard"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-blue-500/30 group flex flex-col h-full">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden bg-gray-900/50 flex-shrink-0">
                <img
                  src={course?.image?.url || "/imgPL.webp"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-2 py-1 rounded-md">
                  10% OFF
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                {/* Course Title */}
                <h2 className="text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h2>
                
                {/* Course Description */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                  {course.description}
                </p>
                
                {/* Course Price */}
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10 mb-5">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through">₹300</span>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">₹{course.price}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    to={`/admin/update-course/${course._id}`}
                    className="flex-1 bg-white/5 hover:bg-blue-600/50 border border-white/10 hover:border-blue-500/50 text-white py-2.5 rounded-xl transition-all duration-300 font-medium text-sm text-center"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 bg-white/5 hover:bg-red-600/50 border border-white/10 hover:border-red-500/50 text-white py-2.5 rounded-xl transition-all duration-300 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {courses.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-600 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400">No courses found</h3>
              <p className="text-gray-500 mt-2 text-center">You haven't created any courses yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OurCourses;
