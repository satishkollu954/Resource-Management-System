import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import loginImg from "../RT.png";

export function Login() {
  const [cookies, setCookie] = useCookies(["email"]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.Email) {
        errors.Email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
        errors.Email = "Invalid email address";
      }
      if (!values.Password) {
        errors.Password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (user) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/user/login",
          user
        );
        if (response.status === 200) {
          setCookie("email", response.data.user.Email, { path: "/" });
          const loggedInUser = response.data.user.Email;
          navigate(
            loggedInUser === "admin@gmail.com"
              ? "/admindashboard"
              : "/userdashboard"
          );
        }
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="shadow-lg d-flex flex-column flex-md-row card"
        style={{
          width: "850px",
          height: "500px",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <div className="d-none d-md-block pt-5" style={{ flex: 1 }}>
          <img
            src={loginImg}
            alt="login"
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          className="p-4 d-flex flex-column justify-content-center"
          style={{ flex: 1 }}
        >
          <h3 className="text-center mb-4 text-primary fw-bold">User Login</h3>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                className={`form-control ${
                  formik.touched.Email && formik.errors.Email
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
              />
              {formik.touched.Email && formik.errors.Email && (
                <div className="invalid-feedback">{formik.errors.Email}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                className={`form-control ${
                  formik.touched.Password && formik.errors.Password
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
              />
              {formik.touched.Password && formik.errors.Password && (
                <div className="invalid-feedback">{formik.errors.Password}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/reset" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-1">
            <Link to="/register" className="text-decoration-none">
              New User? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
