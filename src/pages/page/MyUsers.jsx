import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  FaUserCircle,
  FaShoppingBag,
  FaWallet,
  FaUsers,
} from "react-icons/fa";
import Footer_Nav from "./../Shared/Footer_Nav";
import { t } from "i18next";
import { Link, NavLink } from "react-router";

import { Copy } from "lucide-react";

import { IoLanguageOutline } from "react-icons/io5";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import verified_logo from "../../assets/verified.png";

const MyUsers = () => {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("verified"); // ✅ for tab switching


  const [profile, setProfile] = useState(null);
  const [networks, setNetowrks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosSecure.get("/my-referred-users");
        console.log(response.data.referred_users);

        // Store profile and referred users
        setProfile(response.data.data || response.data);
        setNetowrks(response.data.referred_users || []);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);




  const referCode = profile?.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode);
    alert("Refer code copied!");
  };



  // ✅ Separate users
  const verifiedUsers = networks.filter(
    (user) => user.is_approved === "approved"
  );
  const unverifiedUsers = networks.filter(
    (user) => user.is_approved !== "approved"
  );

  // ✅ Filter based on active tab + search
  const filtered =
    activeTab === "verified"
      ? verifiedUsers.filter(
          (item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone?.includes(search) ||
            item.ref?.includes(search)
        )
      : unverifiedUsers.filter(
          (item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone?.includes(search) ||
            item.ref?.includes(search)
        );

  return (
    <div className="min-h-screen sticky top-0 z-10 mx-auto lg:max-w-7xl bg-[#ff9100]">
      {/* Header */}
      <div className="navbar-start flex w-full items-center">

          <div className="flex items-center space-x-2 mb-4 px-4">
            <NavLink to="/mynetwork" className="btn btn-ghost btn-circle">
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
              My Network
            </h2>
          </div>

     
      </div>

      {/* List */}
      <div className="bg-gray-100 rounded-t-3xl mt-4 p-4 space-y-4">
        {/* ✅ Tabs */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setActiveTab("verified")}
            className={`px-5 py-2 rounded-full font-semibold border ${
              activeTab === "verified"
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            ভেরিফাইড
          </button>
          <button
            onClick={() => setActiveTab("unverified")}
            className={`px-5 py-2 rounded-full font-semibold border ${
              activeTab === "unverified"
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            আনভেরিফাইড
          </button>
        </div>

        {/* ✅ Search bar */}
        <div className="px-4 bg-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="রেফার কোড সার্চ করুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full rounded-full pl-10 bg-white"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500 text-xl" />
          </div>
        </div>

        {/* ✅ User List */}
        {filtered.length > 0 ? (
          filtered.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
            >
              <img
                src={user.avatar_url || "/default-avatar.png"}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  {user.is_approved === "approved" && (
                    <img src={verified_logo} className="w-5 h-5" alt="verified" />
                  )}
                </div>
                <p className="text-gray-700">{user.phone}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">রেফার কোডঃ</span> {user.ref}{" "}
                  <button
                    onClick={() => navigator.clipboard.writeText(user.ref)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    📋
                  </button>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">রেজিস্ট্রেশন তারিখঃ</span>{" "}
                  {user.created_at}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-600 font-medium">
            কোন রেফার কোড পাওয়া যায়নি
          </div>
        )}
      </div>

      <Footer_Nav />
    </div>
  );
};

export default MyUsers;
