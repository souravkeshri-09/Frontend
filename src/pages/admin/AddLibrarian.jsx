import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

export default function AddLibrarian() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const authToken = localStorage.getItem("authToken");

      const formData = {
        ...data,
        role: "librarian",
      };

      await axios.post(
        `${Server_URL}admin/addlibrarian`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      showSuccessToast("Librarian Added Successfully!");
      reset();
    } catch (error) {
      console.error(error.response?.data || error.message);

      showErrorToast(
        error.response?.data?.message || "Registration Failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "rgba(147,51,234,.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 15px",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-5 col-md-7 col-sm-10">

          <div
            className="card border-0"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(139,92,246,.25)",
            }}
          >
            {/* Header */}
            {/* Header */}
            <div
              className="py-4 text-white d-flex flex-column justify-content-center align-items-center"
              style={{
                background: "#8b5cf6",
                textAlign: "center",
              }}
            >
              <FaUserPlus
                size={50}
                style={{
                  display: "block",
                  margin: "0 auto 12px",
                }}
              />

              <h2 className="fw-bold mb-1">
                Add Librarian
              </h2>

              <p className="mb-0">
                Create a new librarian account
              </p>
            </div>

            {/* Form */}
            <div className="card-body p-4 bg-white">

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <b>Full Name</b>
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Full Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />

                  {errors.name && (
                    <small className="text-danger">
                      {errors.name.message}
                    </small>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <b>Email Address</b>
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />

                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <b>Password</b>
                  </label>

                  <div className="input-group">

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      placeholder="Enter Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
                        },
                      })}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 text-white fw-bold py-3"
                  style={{
                    backgroundColor: "#8b5cf6",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "17px",
                    transition: "0.3s",
                  }}
                >
                  {loading
                    ? "Adding Librarian..."
                    : "Add Librarian"}
                </button>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}