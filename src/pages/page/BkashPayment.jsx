import React from "react";
import bkash from "../../assets/bkash.png";
import Swal from "sweetalert2";
import { Copy } from "lucide-react";
import { NavLink } from "react-router";

export default function BkashPayment() {
  const handleWhatsAppClick = (number) => {
    // Convert BD number -> international format (remove first 0, add 88)
    const formatted = `880${number.slice(1)}`;
    const url = `https://wa.me/${formatted}`;
    window.open(url, "_blank");
  };

  const Code = "01968340274";
  const handleCopy = () => {
    navigator.clipboard
      .writeText(Code)
      .then(() => {
        console.log("Copied code!");
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "This number copied to clipboard",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the Number",
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#ff9100] flex flex-col items-center pt-4">
      {/* Header */}
      <div className="w-full max-w-md">
        <div className="flex items-center space-x-2 mb-4 px-4">
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
          <h2 className="text-xl font-semibold text-white">
            Account Verification
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-t-[50px] pt-6 pb-10 px-8 text-center">
          {/* Logo */}
          <img src={bkash} alt="bKash" className="h-16 mx-auto mb-3" />

          {/* Amount */}
          <div className="bg-white w-full text-[#ff9100] text-2xl font-bold inline-block px-6 py-1 rounded-xl shadow-md mb-4 text-start">
            <span className="font-extrabold">৳</span> 150
          </div>

          {/* Form Section */}
          <div className="bg-[#ff0066] rounded-xl text-white py-6 px-6 text-left shadow-md">
            <ul className="list-disc list-outside pl-5 space-y-3 text-sm leading-relaxed">
              <li className="shadow-md py-1">
                *247# ডায়াল করে আপনার BKASH মোবাইল মেনুতে যান অথবা BKASH অ্যাপে
                যান।
              </li>

              <li className="shadow-md py-1">
                <span className="font-semibold text-yellow-300">
                  "Send Money"
                </span>
                -এ ক্লিক করুন।
              </li>

              <li className="shadow-md py-1">
                প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুনঃ <br />
                <span className="font-semibold text-yellow-300 flex">
                  01968340274
                  <button className="ml-2 bg-gray-800 text-[#ff0066] text-xs font-semibold px-2 py-1 rounded shadow flex gap-1">
                    <Copy
                      onClick={handleCopy}
                      className="size-4 ml-2 cursor-pointer transition"
                    />
                    Copy
                  </button>
                </span>
              </li>

              <li className="shadow-md py-1">
                টাকার পরিমাণঃ{" "}
                <span className="font-semibold text-yellow-300">150</span>
              </li>

              <li className="shadow-md py-1">
                নিশ্চিত করতে এখন আপনার BKASH মোবাইল মেনু পিন লিখুন।
              </li>

              <li className="shadow-md py-1">
                সবকিছু ঠিক থাকলে, আপনি BKASH থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।
              </li>

              <li className="shadow-md py-1">
                নিচের VERIFY বাটনে ক্লিক করুন। ভেরিফাই বাটনে ক্লিক করার পর
                আপনাকে হোয়াটসঅ্যাপে নিয়ে যাবে! আপনি যে পেমেন্ট করছেন তার একটা
                স্ক্রিনশট দিবেন, ট্রানজেকশন আইডি দিবেন এবং আপনার একাউন্ট রেফার
                কোড দিয়ে মেসেজ করবেন। এডমিন চেক করে 15/30 মিনিটের মধ্যে আপনার
                একাউন্ট ভেরিফাই করে দেওয়া হবেই ইনশাআল্লাহ।
              </li>
            </ul>
          </div>

          {/* Verify Button */}
          <button
            onClick={() => handleWhatsAppClick("01968340274")}
            className="mt-6 bg-[#ff0066] text-white font-semibold w-full py-3 rounded-full text-lg shadow-md hover:bg-[#e6005a] transition"
          >
            VERIFY
          </button>
        </div>
      </div>
    </div>
  );
}
