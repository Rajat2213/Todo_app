import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode); // Get theme from Redux

  // Navigate only after Redux updates user state
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/tasks");
    }
  }, [isAuthenticated, user, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success("Logged in successfully! 🎉");
    } catch (error) {
      toast.error(error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back! 👋</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Email</label>
                <div className={`flex items-center border rounded p-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
                  <FaEnvelope className="mr-2" />
                  <Field type="email" name="email" className="w-full bg-transparent focus:outline-none" />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1">Password</label>
                <div className={`flex items-center border rounded p-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
                  <FaLock className="mr-2" />
                  <Field type="password" name="password" className="w-full bg-transparent focus:outline-none" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`w-full font-bold py-2 rounded transition ${loading || isSubmitting ? "opacity-50 cursor-not-allowed" : ""} ${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              >
                {loading || isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4">
          Don't have an account? {" "}
          <span onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
