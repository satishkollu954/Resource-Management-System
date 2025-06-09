import { useFormik } from "formik";
import axios from "axios";

export function EditUserManagement({ user, onClose }) {
  const formik = useFormik({
    initialValues: {
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Address: user.Address,
      Mobile: user.Mobile,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .put(`http://localhost:4000/user/admin/${values.Email}`, values)
        .then(() => {
          alert("User updated successfully");
          onClose(); // Close the modal
        })
        .catch((error) => {
          console.error("Update error:", error);
          alert("Failed to update user");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label>First Name</label>
        <input
          name="FirstName"
          className="form-control"
          value={formik.values.FirstName}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          name="LastName"
          className="form-control"
          value={formik.values.LastName}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          name="Email"
          className="form-control"
          value={formik.values.Email}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <input
          name="Address"
          className="form-control"
          value={formik.values.Address}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Mobile</label>
        <input
          name="Mobile"
          className="form-control"
          value={formik.values.Mobile}
          onChange={formik.handleChange}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success me-2">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
