import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { t } from "i18next";

const AllWithdraws = () => {
  const axiosSecure = useAxiosSecure();
  const [withdraws, setWithdraws] = useState([]);

  // ✅ Fetch all withdrawals
  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const res = await axiosSecure.get("/admin/withdraws");
        // API returns { status: true, data: [...] }
        if (res.data?.status) {
          setWithdraws(res.data.data);
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        console.error("❌ Failed to fetch withdraws:", err);
        Swal.fire({
          icon: "error",
          title: t("LoadFailed") || "Failed to Load Withdraws",
          text: "Please check your network or server.",
        });
      }
    };

    fetchWithdraws();
  }, [axiosSecure]);

  // ✅ Handle approve/reject
  const handleStatusChange = async (withdrawId, newStatus) => {
    try {
      const { value: note } = await Swal.fire({
        title:
          newStatus === "approved"
            ? "Approve Withdrawal?"
            : "Reject Withdrawal?",
        input: "text",
        inputPlaceholder: "Add a note (optional)...",
        showCancelButton: true,
        confirmButtonText: "Yes, Update",
        cancelButtonText: "Cancel",
        inputValue: "",
        preConfirm: (val) => val,
      });

      if (note === undefined) return; // canceled

      const res = await axiosSecure.put(`/admin/withdraws/${withdrawId}`, {
        status: newStatus,
        note,
      });

      if (res.data?.status) {
        // ✅ Update UI instantly
        setWithdraws((prev) =>
          prev.map((item) =>
            item.id === withdrawId
              ? { ...item, status: newStatus, note: note || "" }
              : item
          )
        );

        Swal.fire({
          icon: "success",
          title:
            newStatus === "approved"
              ? t("WithdrawApproved") || "Withdrawal Approved!"
              : t("WithdrawRejected") || "Withdrawal Rejected!",
          text:
            res.data?.message ||
            `Withdrawal has been ${newStatus} successfully.`,
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("❌ Failed to update withdraw status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating withdrawal status.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">All Withdraw Requests</h1>

      {withdraws.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No withdrawal requests found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Method</th>
                <th className="py-3 px-4 text-left">Account</th>
                <th className="py-3 px-4 text-left">Note</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdraws.map((w, index) => (
                <tr
                  key={w.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    {w?.user?.name || "Unknown User"}
                    <br />
                    <span className="text-sm text-gray-500">
                      {w?.user?.email}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    ৳{w.amount}
                  </td>
                  <td className="py-3 px-4">{w.method}</td>
                  <td className="py-3 px-4">{w.account_number}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {w.note || "-"}
                  </td>

                  {/* Status badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        w.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : w.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {w.status || "pending"}
                    </span>
                  </td>

                  {/* Approve/Reject Buttons */}
                  <td className="py-3 px-4 flex gap-2">
                    {w.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(w.id, "approved")}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(w.id, "rejected")}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {w.status !== "pending" && (
                      <span className="text-gray-500 text-sm italic">
                        {w.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllWithdraws;
