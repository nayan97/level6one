import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data.data || []); // assuming { status: true, data: [...] }
      } catch (error) {
        console.error("❌ Failed to fetch users:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load users",
          text: "Please check your network or permissions.",
        });
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // ✅ Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.put(`/users/${userId}/role`, { role: newRole });

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, role: newRole } : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: `User role changed to "${newRole}".`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("❌ Failed to update role:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the role.",
      });
    }
  };

  // ✅ Handle approval status change
  const handleApprovalChange = async (userId, newStatus) => {
    try {
      await axiosSecure.put(`/users/${userId}/approval`, { is_approved: newStatus });

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, is_approved: newStatus } : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Approval Updated!",
        text: `User approval status set to "${newStatus}".`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("❌ Failed to update approval:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update approval status.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Users</h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Verify</th>
                  <th className="py-3 px-4 text-left">Referred Code</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>

                    {/* Role */}
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </td>

                    {/* Approval */}
                        <td className="py-3 px-4">
                        <select
                            value={user.is_approved || "pending"}
                            onChange={(e) => handleApprovalChange(user.id, e.target.value)}
                            disabled={user.is_approved === "approved"} // ✅ Disable when already approved
                            className={`border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 ${
                            user.is_approved === "approved"
                                ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed opacity-70"
                                : "bg-yellow-100 text-yellow-700 border-yellow-300"
                            }`}
                        >
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                        </select>
                        </td>


                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.referred_code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
