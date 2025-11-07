import React from "react";
import bkash from "../../assets/bkash.png";
import Nagod from "../../assets/Nagod.png";
import Rocket from "../../assets/Rocket.png";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";
import Swal from "sweetalert2";

export default function AccountVerification() {
  const handlePayment = (method) => {
    alert(`You selected ${method} payment`);
  };

    const handleNoPaymentMethod = () => {
    Swal.fire({
      icon: "warning",
      title: "No Payment Method Selected",
      text: "অনুগ্রহ করে একটি পেমেন্ট মেথড নির্বাচন করুন।",
      confirmButtonText: "OK",
      confirmButtonColor: "#facc15", // yellow tone
    });
  };

  return (
    <div className="bg-[#ff9100] flex flex-col items-center pt-4">
      {/* Header */}
      <div className="w-full max-w-md">
        <div className="flex items-center space-x-2 mb-4">
          <NavLink to="/" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </NavLink>
          <h2 className="text-xl font-semibold text-gray-800">
            Account Verification
          </h2>
        </div>

        {/* Main Card */}
        <div className="min-h-screen bg-white shadow-xl rounded-t-[50px] pt-6">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Life Good Digital Business"
              className="w-20 h-20 mb-3 rounded-full border-2 border-yellow-400 cursor-pointer"
              onClick={() => handlePayment("Logo")}
            />
            <h3 className="text-lg font-bold text-gray-800 text-center mb-4">
              Life Change Digital Business
            </h3>

            {/* Mobile Banking Section */}
            <div className="w-full text-center mb-2">
              <p className="font-semibold text-gray-600">মোবাইল ব্যাংকিং</p>
            </div>
            <button
              className="btn btn-primary mt-6 w-80 text-lg font-semibold position-bottom-4 mb-4"
              onClick={handleNoPaymentMethod}
            >
              Pay 150.00 BDT
            </button>
            {/* Payment Options */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              <NavLink
                to="/bkash_payment"
                className="p-3 bg-white rounded-xl shadow hover:bg-pink-50 transition"
              >
                <img src={bkash} alt="bKash" className="h-10 mx-auto" />
              </NavLink>

              <NavLink
                to="/nagod_payment"
                className="p-3 bg-white rounded-xl shadow hover:bg-orange-50 transition"
              >
                <img src={Nagod} alt="Nagad" className="h-10 mx-auto" />
              </NavLink>

              <NavLink
                to="/comingsoon"
                className="col-span-2 p-3 bg-white rounded-xl shadow hover:bg-purple-50 transition"
              >
                <img src={Rocket} alt="Rocket" className="h-10 mx-auto" />
              </NavLink>
            </div>

            {/* Pay Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
