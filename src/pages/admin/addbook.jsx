import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


import {
  FaBook,
  FaUser,
  FaTag,
  FaBarcode,
  FaImage,
  FaMoneyBillWave,
  FaBoxes,
  FaFileAlt,
} from "react-icons/fa";

import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

const AddBookForm = () => {
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

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "coverImage") {
          formData.append(key, data[key]);
        }
      });

      if (data.coverImage && data.coverImage[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const authToken = localStorage.getItem("authToken");

      const url = `${Server_URL}books/add`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response?.data?.message || "Failed to add book!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "rgba(147,51,234,.35)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-9 col-xl-8">
          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            {/* Header */}
            {/* Header */}
            <div
              className="text-white py-4 d-flex flex-column align-items-center justify-content-center text-center"
              style={{
                background: "#8b5cf6",
              }}
            >
              <FaBook
                size={60}
                style={{
                  display: "block",
                  margin: "0 auto",
                }}
              />

              <h2 className="fw-bold mt-3 mb-1">
                Add New Book
              </h2>

              <p className="mb-0 opacity-75">
                Manage your library collection
              </p>
            </div>

            <div className="card-body p-4 p-lg-5">

              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row g-4">

                  {/* Book Title */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>Book Title</b>
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter Book Title"
                      {...register("title", {
                        required: "Book title is required",
                      })}
                    />

                    {errors.title && (
                      <small className="text-danger">
                        {errors.title.message}
                      </small>
                    )}

                  </div>

                  {/* Author */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>Author</b>
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter Author Name"
                      {...register("author", {
                        required: "Author is required",
                      })}
                    />

                    {errors.author && (
                      <small className="text-danger">
                        {errors.author.message}
                      </small>
                    )}

                  </div>
                  {/* Category */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>Category</b>
                    </label>

                    <select
                      className="form-select form-select-lg"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      <option value="">Select Category</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-fiction">Non-fiction</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Technology">Technology</option>
                      <option value="Biography">Biography</option>
                    </select>

                    {errors.category && (
                      <small className="text-danger">
                        {errors.category.message}
                      </small>
                    )}

                  </div>

                  {/* ISBN */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>ISBN Number</b>
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter ISBN Number"
                      {...register("isbn", {
                        required: "ISBN is required",
                      })}
                    />

                    {errors.isbn && (
                      <small className="text-danger">
                        {errors.isbn.message}
                      </small>
                    )}

                  </div>
                  {/* Book Cover Image */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>Book Cover Image</b>
                    </label>

                    <input
                      type="file"
                      className="form-control form-control-lg"
                      accept="image/*"
                      {...register("coverImage")}
                    />

                    <small className="text-muted">
                      Upload JPG, JPEG or PNG image
                    </small>

                  </div>

                  {/* Total Copies */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>Total Copies</b>
                    </label>

                    <input
                      type="number"
                      min="1"
                      className="form-control form-control-lg"
                      placeholder="Enter Total Copies"
                      {...register("totalCopies", {
                        required: "Total copies is required",
                        min: {
                          value: 1,
                          message: "Minimum 1 copy required",
                        },
                      })}
                    />

                    {errors.totalCopies && (
                      <small className="text-danger">
                        {errors.totalCopies.message}
                      </small>
                    )}

                  </div>
                  {/* Price */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fw-semibold">
                      <b>Price</b>
                    </label>

                    <div className="input-group input-group-lg">

                      <span className="input-group-text">
                        ₹
                      </span>

                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="Enter Book Price"
                        {...register("price", {
                          required: "Price is required",
                          min: {
                            value: 1,
                            message: "Price must be greater than 0",
                          },
                        })}
                      />

                    </div>

                    {errors.price && (
                      <small className="text-danger">
                        {errors.price.message}
                      </small>
                    )}

                  </div>

                  {/* Description */}

                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      <b>Description</b>
                    </label>

                    <textarea
                      rows="5"
                      className="form-control"
                      placeholder="Enter book description..."
                      {...register("description", {
                        required: "Description is required",
                      })}
                    ></textarea>

                    {errors.description && (
                      <small className="text-danger">
                        {errors.description.message}
                      </small>
                    )}

                  </div>

                  {/* Buttons */}

                  <div className="col-12 mt-3">

                    <div className="d-grid gap-3 d-md-flex justify-content-md-end">

                      {/* Reset Button */}

                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4 py-2"
                        onClick={() => reset()}
                        disabled={loading}
                        style={{
                          borderRadius: "10px",
                          minWidth: "140px",
                        }}
                      >
                        Reset
                      </button>

                      {/* Submit Button */}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn text-white px-4 py-2"
                        style={{
                          backgroundColor: "#8b5cf6",
                          border: "none",
                          borderRadius: "10px",
                          minWidth: "180px",
                          fontWeight: "600",
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>

                            Adding Book...
                          </>
                        ) : (
                          <>
                            Add Book
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              </form>

            </div>


          </div>

        </div>
      </div>

      {/* Quick Tips */}

      <div className="row justify-content-center mt-3">

        <div className="col-lg-8">

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "16px",
            }}
          >



          </div>

        </div>

      </div>

      {/* Copyright */}

      <div className="row justify-content-center mt-4">

        <div className="col-lg-8">

          <p
            className="text-center mb-0"
            style={{
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            © {new Date().getFullYear()} AXLIB Library Management System
          </p>

        </div>

      </div>

    </div>
  );
};

export default AddBookForm;