import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

export function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      Address: "",
      Mobile: "",
    },
    validationSchema: yup.object({
      FirstName: yup.string().required("First name is required"),
      Email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      Password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
      Mobile: yup
        .string()
        .required("Mobile is required")
        .matches(/\+91\d{10}/, "Use format +91xxxxxxxxxx"),
    }),
    validate: async (values) => {
      const errors = {};
      values.Email = values.Email.trim();
      if (/[A-Z]/.test(values.Email)) {
        errors.Email = "Email must not contain capital letters";
        return errors;
      }
      try {
        const res = await axios.get("http://127.0.0.1:4000/user/get-users");
        const exists = res.data.some((u) => u.Email === values.Email);
        if (exists) {
          errors.Email = "Email already exists";
        }
      } catch (error) {
        console.error("Email check failed:", error);
      }
      return errors;
    },
    onSubmit: (user) => {
      axios
        .post("http://127.0.0.1:4000/user/add-user", user)
        .then(() => {
          alert("Registration successful");
          navigate("/login");
        })
        .catch(() => {
          alert("Registration failed. Please try again.");
        });
    },
  });

  return (
    <div className="container py-5">
      <div
        className="row shadow-lg rounded-4 overflow-hidden"
        style={{ minHeight: "500px" }}
      >
        {/* Left Side Image */}
        <div className="col-md-6 d-none d-md-block pt-5">
          <img
            src="RT.png"
            alt="Register Visual"
            className="img-fluid h-90 w-90"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-6 bg-white p-4 w-50">
          <h3 className="text-center text-primary mb-4 fw-bold">
            User Registration
          </h3>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="FirstName"
                className={`form-control ${
                  formik.touched.FirstName && formik.errors.FirstName
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.FirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.FirstName && formik.errors.FirstName && (
                <div className="invalid-feedback">
                  {formik.errors.FirstName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="LastName"
                className="form-control"
                value={formik.values.LastName}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="Email"
                className={`form-control ${
                  formik.touched.Email && formik.errors.Email
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Email && formik.errors.Email && (
                <div className="invalid-feedback">{formik.errors.Email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="Password"
                className={`form-control ${
                  formik.touched.Password && formik.errors.Password
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Password && formik.errors.Password && (
                <div className="invalid-feedback">{formik.errors.Password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="Address"
                className="form-control"
                value={formik.values.Address}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                name="Mobile"
                className={`form-control ${
                  formik.touched.Mobile && formik.errors.Mobile
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.Mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Mobile && formik.errors.Mobile && (
                <div className="invalid-feedback">{formik.errors.Mobile}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none">
              Already have an account? Login
            </Link>
            <br />
            <Link to="/" className="text-decoration-none">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
