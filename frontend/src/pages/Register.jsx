import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode); // Get theme from Redux

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success("Registration successful! 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Username</label>
                <div className={`flex items-center border rounded p-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
                  <FaUser className="mr-2" />
                  <Field type="text" name="username" className="w-full bg-transparent focus:outline-none" />
                </div>
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>

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
                {loading || isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;