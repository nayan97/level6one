import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import driveimg from "../../assets/drive.png";
import videoimg from "../../assets/video.png";
import applyvendor from "../../assets/applyvendor.png";
import videocourseimg from "../../assets/videocourse.png";
import rankimg from "../../assets/rank.png";
import addsimg from "../../assets/add.png";
import quizimg from "../../assets/quiz.png";
import rechargeimg from "../../assets/recharge.png";
import jobimg from "../../assets/job.png";
import microimg from "../../assets/micro.png";
import resellimg from "../../assets/resell.png";
import bonusimg from "../../assets/bonus.jpg";
import freeimg from "../../assets/freelance.png";
import dailyimg from "../../assets/daily.png";
import microjobimg from "../../assets/microjob.png";
import useAuth from "../../hooks/useAuth";

const projects1 = [
  { name: "MobileRecharge", icon: rechargeimg, isActive: true, link: "comingsoon" },
  { name: "DriveOffer", icon: driveimg, isActive: true, link: "/driveoffer" },
  { name: "ResellingProduct", icon: resellimg, isActive: true, link: "/shop" },
  { name: "AdsViewIncome", icon: addsimg, isActive: true, link: "adsview" },
  { name: "MicroJob", icon: microjobimg, isActive: true, link: "comingsoon" },
  { name: "JobPost", icon: jobimg, isActive: true, link: "/typing-job" },
  { name: "TypingJob", icon: microimg, isActive: true, link: "comingsoon" },
  { name: "QuizJob", icon: quizimg, isActive: true, link: "comingsoon" },
  { name: "WatchVideo", icon: videoimg, isActive: true, link: "comingsoon" },
  { name: "MarkSalary", icon: bonusimg, isActive: true, link: "comingsoon" },
  { name: "DailyTargetBonus", icon: dailyimg, isActive: true, link: "comingsoon" },
  { name: "FreelancingCourse", icon: freeimg, isActive: true, link: "comingsoon" },
  { name: "VideoCourse", icon: videocourseimg, isActive: true, link: "comingsoon" },
  { name: "Rank", icon: rankimg, isActive: true, link: "comingsoon" },
  { name: "Applyvendor", icon: applyvendor, isActive: true, link: "comingsoon" },
];

export default function LifeGoodHome() {
  const { t } = useTranslation();
    const navigate = useNavigate(); // ✅ Hook for navigation
  const { user } = useAuth();

  // ✅ Only verified if explicitly approved
  const isVerified = user?.is_approved === "approved";
  console.log("User verified:", isVerified, user);

  // 🚫 Disable background clicks if user exists but not verified
  useEffect(() => {
    if (user && !isVerified) {
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.pointerEvents = "auto";
    }
    return () => {
      document.body.style.pointerEvents = "auto";
    };
  }, [user, isVerified]);

  return (
    <div className="min-h-screen flex flex-col rounded-[50px] bg-gray-50 relative">
      {/* 🚨 Verify Section (only if user exists AND not approved) */}
      {user && !isVerified && (
        <div className="w-96 bg-white rounded-xl shadow p-4 text-center mt-4 mx-4 lg:ml-[430px] pointer-events-auto">
          <div className="text-red-600 text-4xl mb-2">❗</div>
          <p className="text-gray-800 font-medium mb-3 text-sm leading-relaxed">
            আপনার অ্যাকাউন্ট ভেরিফাই করা হয়নি। আমাদের সকল সার্ভিস ব্যবহারের জন্য
            অ্যাকাউন্ট ভেরিফাই করুন।
          </p>
          <button
            onClick={() => navigate("/ac_verify")} // ✅ Navigate to your verification page
            className="bg-yellow-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-yellow-600 transition"
          >
            ভেরিফাই করুন
          </button>
        </div>
      )}

      {/* 🧩 Main Content (dimmed & unclickable when not verified) */}
      <div
        className={`px-4 pt-4 transition-opacity duration-300 ${
          user && !isVerified ? "opacity-40 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-full h-32 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
          {t("Business")} {t("plan")} {t("Banner")}
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-lg font-semibold my-3">{t("OurProjects")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {projects1.map((p, i) => (
            <Link
              key={i}
              to={isVerified ? p.link : "#"}
              onClick={(e) => !isVerified && e.preventDefault()}
              state={{ name: p.name }}
              className={`btn w-full h-full flex flex-col items-center justify-center bg-white shadow rounded-xl py-6 ${
                !p.isActive
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : "hover:shadow-lg"
              }`}
            >
              {p.icon ? (
                <img
                  src={p.icon}
                  alt={p.name}
                  className="w-10 h-10 rounded-full object-contain"
                />
              ) : (
                <span className="text-2xl">❓</span>
              )}
              <span className="text-xs mt-2">{t(p.name)}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 pb-20 mt-6">
        <Link
          to={isVerified ? "/adsmarketing" : "#"}
          onClick={(e) => !isVerified && e.preventDefault()}
        >
          <div className="w-full py-4 mb-4 bg-white text-green-400 font-bold rounded-xl text-center shadow">
            {t("Free")} {t("Ads")} {t("Banner")}
          </div>
        </Link>
      </div>
    </div>
  );
}
