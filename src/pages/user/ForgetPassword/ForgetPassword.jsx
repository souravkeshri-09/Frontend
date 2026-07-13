import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate, Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "./ForgotPassword.css";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${Server_URL}users/forgot-password`,
        data
      );

      alert(res.data.message);

      navigate("/verifyotp", {
        state: {
          email: data.email,
        },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">

        {/* Lock Icon */}
        <div className="user-circle">
          <FaLock />
        </div>

        {/* Header */}
        <div className="forgot-password-header">
          <h2 className="forgot-password-title">
            Forgot Password
          </h2>

          <p className="forgot-password-subtitle">
            Enter your registered email address to receive an (OTP).
          </p>
        </div>

        {/* Form */}
        <form
          className="forgot-password-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="forgot-password-form-group">

            <label
              htmlFor="email"
              className="forgot-password-label"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              className={`forgot-password-input ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Enter your registered email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <span className="forgot-password-error">
                {errors.email.message}
              </span>
            )}

          </div>

          <button
            type="submit"
            className="forgot-password-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* Footer */}
        <div className="forgot-password-footer">
          Remember your password?{" "}
          <Link
            to="/login"
            className="forgot-password-login-link"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;