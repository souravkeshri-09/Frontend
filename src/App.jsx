import { useEffect, lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./App.css";

import Userlayout from "./layout/userlayout";
import AdminLayout from "./layout/adminlayout";

// =======================
// Lazy Imports
// =======================

const Login = lazy(() => import("./pages/user/login"));
const Register = lazy(() => import("./pages/user/register"));
const Home = lazy(() => import("./pages/user/home"));
const Books = lazy(() => import("./pages/user/books"));
const AllCategories = lazy(() => import("./pages/user/allcategories"));
const AdminDashboard = lazy(() => import("./pages/admin/admindashboard"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AddBookForm = lazy(() => import("./pages/admin/addbook"));
const ViewBooks = lazy(() => import("./pages/admin/viewbook"));
const AddLibrarian = lazy(() => import("./pages/admin/AddLibrarian"));
const BookDetails = lazy(() => import("./pages/user/bookdetails"));
const ProfilePage = lazy(() => import("./pages/user/profile"));
const LibrarianRequests = lazy(() => import("./pages/librarian/LibrarianRequest"));
const ReturnRequest = lazy(() => import("./pages/librarian/ReturnRequest"));
const AboutUs = lazy(() => import("./pages/user/AboutUs"));
const ContactUs = lazy(() => import("./pages/user/ContactUs"));
const BooksBorrowed = lazy(() => import("./pages/librarian/BooksBorrowed"));
const ForgotPassword = lazy(() =>
  import("./pages/user/ForgetPassword/ForgetPassword")
);
const VerifyOTP = lazy(() =>
  import("./pages/user/ForgetPassword/VerifyOtp")
);
const ResetPassword = lazy(() =>
  import("./pages/user/ForgetPassword/UpdatePassword")
);

// =======================
// Preloader
// =======================

const Preloader = () => (
  <div className="preloader">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // =======================
  // Auto Scroll To Top
  // =======================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.search]);

  // =======================
  // Auto Redirect
  // =======================

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token && location.pathname === "/") {
      try {
        const decoded = jwtDecode(token);

        if (
          decoded.role === "admin" ||
          decoded.role === "librarian"
        ) {
          navigate("/admin", { replace: true });
        } else if (decoded.role === "user") {
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("authToken");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {/* Admin Login */}
        <Route path="/">
          <Route
            path="admin-login"
            element={<AdminLogin />}
          />
        </Route>

        {/* User Layout */}
        <Route path="/" element={<Userlayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route
            path="bookdetails/:id"
            element={<BookDetails />}
          />
          <Route
            path="category"
            element={<AllCategories />}
          />
          <Route
            path="register"
            element={<Register />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="aboutus"
            element={<AboutUs />}
          />
          <Route
            path="contactus"
            element={<ContactUs />}
          />
          <Route
            path="forgetPassword"
            element={<ForgotPassword />}
          />
          <Route
            path="verifyotp"
            element={<VerifyOTP />}
          />
          <Route
            path="resetpass"
            element={<ResetPassword />}
          />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<AdminDashboard />}
          />
          <Route
            path="addbook"
            element={<AddBookForm />}
          />
          <Route
            path="viewbook"
            element={<ViewBooks />}
          />
          <Route
            path="addlibrarian"
            element={<AddLibrarian />}
          />
          <Route
            path="issuerequest"
            element={<LibrarianRequests />}
          />
          <Route
            path="returnrequest"
            element={<ReturnRequest />}
          />
          <Route
            path="issued"
            element={<BooksBorrowed />}
          />
        </Route>

        {/* User Profile */}
        <Route path="/user" element={<Userlayout />}>
          <Route
            index
            element={<ProfilePage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;