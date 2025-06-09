import axios from "axios";
import { useEffect, useState } from "react";
import { EditUserManagement } from "./editUserManagement";
import { useCookies } from "react-cookie";

export function UserManagement({ isAdmin = false }) {
  const [cookies, setCookie] = useCookies(["email"]);
  const [state, setState] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function loadData() {
    const email = cookies.email;
    // console.log("Fetching users for email:", email);
    axios
      .get(`http://localhost:4000/user/get-users/${email}`)
      .then((response) => setState(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }

  function handleDeleteClick(email) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:4000/user/admin/${email}`)
        .then(() => {
          alert("User deleted successfully");
          loadData();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user");
        });
    }
  }

  function handleEditClick(user) {
    setSelectedUser(user);
    setShowEditModal(true);
  }

  function handleCloseModal() {
    setShowEditModal(false);
    setSelectedUser(null);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Search Input */}
      <div className="mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="fw-bold">USERS</h4>
        </div>

        <div className="card-body">
          {state
            .filter((user) =>
              user.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (
              <div key={index} className="card mb-4 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="w-75">
                    <h5 className="card-title">
                      {user.FirstName} {user.LastName}
                    </h5>
                    <p className="card-text">Email: {user.Email}</p>
                    <p className="card-text">Address: {user.Address}</p>
                    <p className="card-text">Mobile: {user.Mobile}</p>

                    {isAdmin && (
                      <div className="mt-3">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user.Email)}
                          className="btn btn-danger ms-3"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-end">
                    <img
                      src={user.Photo || "https://via.placeholder.com/100"}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #ccc",
                      }}
                    />
                    <p className="mt-2">Profile Picture</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Edit Modal - Only if Admin */}
      {isAdmin && showEditModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <EditUserManagement
                  user={selectedUser}
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
