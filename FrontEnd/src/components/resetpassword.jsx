import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export function ResetPassword() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    Email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    FirstName: yup.string().required("First Name is required"),
    NewPassword: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required("New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
      FirstName: "",
      NewPassword: "",
    },
    validationSchema,
    onSubmit: async (user) => {
      const response = await axios.post(
        "http://127.0.0.1:4000/user/reset",
        user
      );
      console.log(response.data.message);
      alert("Password reset successful. Please login with your new password.");
      navigate("/login");
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('/register.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />
      {/* Form container */}
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "90%",
          zIndex: 1,
          borderRadius: "1rem",
        }}
      >
        <h3 className="mb-4 text-center fw-bold text-primary">
          Reset Password
        </h3>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              id="Email"
              name="Email"
              type="email"
              className={`form-control ${
                formik.touched.Email && formik.errors.Email ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
              placeholder="Enter your email"
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="invalid-feedback">{formik.errors.Email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="FirstName" className="form-label">
              First Name
            </label>
            <input
              id="FirstName"
              name="FirstName"
              type="text"
              className={`form-control ${
                formik.touched.FirstName && formik.errors.FirstName
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.FirstName}
              placeholder="Enter your first name"
            />
            {formik.touched.FirstName && formik.errors.FirstName && (
              <div className="invalid-feedback">{formik.errors.FirstName}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="NewPassword" className="form-label">
              New Password
            </label>
            <input
              id="NewPassword"
              name="NewPassword"
              type="password"
              className={`form-control ${
                formik.touched.NewPassword && formik.errors.NewPassword
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.NewPassword}
              placeholder="Enter your new password"
            />
            {formik.touched.NewPassword && formik.errors.NewPassword && (
              <div className="invalid-feedback">
                {formik.errors.NewPassword}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login" className="text-decoration-none">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
