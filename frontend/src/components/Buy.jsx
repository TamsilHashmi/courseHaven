import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../utils/utils";
function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchBuyCourseData = async () => {
      
      try {
        const response = await axios.post(
          `${BACKEND_URL}/course/buy/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );
        console.log(response.data);
        setCourse(response.data.course);
        setClientSecret(response.data.clientSecret);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error?.response?.status === 400) {
          setError("You have already purchased this course");
          navigate("/purchases");
        } else {
          setError(error?.response?.data?.errors);
        }
      }
    };
    fetchBuyCourseData();
  }, [courseId]);

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Element not found");
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("Cardelement not found");
      setLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Stripe PaymentMethod Error: ", error);
      setLoading(false);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod Created]", paymentMethod);
    }
    if (!clientSecret) {
      console.log("No client secret found");
      setLoading(false);
      return;
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.user?.firstName,
            email: user?.user?.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("payment succeeded: ", paymentIntent);
      setCardError("your payment id: ", paymentIntent.id);
      const paymentInfo = {
        email: user?.user?.email,
        userId: user.user._id,
        courseId: courseId,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      };
      console.log("Payment info: ", paymentInfo);
      await axios
        .post(`${BACKEND_URL}/order`, paymentInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in making payment");
        });
      toast.success("Payment successfull");
      navigate("/purchases");
    }
    setLoading(false);
  };
  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden p-6 md:p-10 flex items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
      {error ? (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-red-500/30 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(239,68,68,0.15)] text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 tracking-tight text-white">{error}</h2>
          <Link
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-200 mt-6 inline-block"
            to={error === "Please login to purchase the courses" ? "/login" : "/purchases"}
          >
            {error === "Please login to purchase the courses" ? "Go to Login" : "View Purchases"}
          </Link>
        </div>
      ) : (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row">
          
          {/* Order Details Left Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            
            <Link to="/courses" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              Back to Courses
            </Link>

            <div className="inline-block bg-white/5 border border-white/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-6 w-fit backdrop-blur-sm">
              Secure Checkout
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-8">
              Order Details
            </h1>
            
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10">
                <h2 className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Course Name</h2>
                <p className="text-white font-bold text-xl">{course.title || "Loading..."}</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl p-6">
                <h2 className="text-orange-400 text-sm mb-1 uppercase tracking-wider font-semibold">Total Amount</h2>
                <p className="text-white font-bold text-4xl">₹{course.price || "0"}</p>
              </div>
            </div>
          </div>

          {/* Payment Form Right Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/20">
            <h2 className="text-2xl font-bold mb-8 text-white">Payment Method</h2>

            <form onSubmit={handlePurchase} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Card Information</label>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 focus-within:border-orange-500/50 transition-colors shadow-inner">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#ffffff",
                          "::placeholder": {
                            color: "#9ca3af",
                          },
                          iconColor: "#f97316",
                        },
                        invalid: {
                          color: "#ef4444",
                          iconColor: "#ef4444",
                        },
                      },
                    }}
                  />
                </div>
                {cardError && (
                  <p className="text-red-400 font-medium text-sm mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {cardError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 mt-8"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${course.price || "0"} Securely`
                )}
              </button>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
              <div className="border-t border-white/10 w-full absolute"></div>
              <span className="bg-transparent backdrop-blur-md px-3 text-sm text-gray-400 relative z-10">Or use</span>
            </div>

            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-6 rounded-xl transition duration-200 mt-6 flex items-center justify-center">
              <span className="mr-2 text-xl">💳</span> Other Payment Methods
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Buy;
