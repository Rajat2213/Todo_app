import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Add navigation

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values.email, values.password));
      toast.success('Logged in successfully!');
      navigate('/tasks'); // Redirect to TaskPage after login
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <Field type="email" name="email" className="w-full p-2 border rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <Field type="password" name="password" className="w-full p-2 border rounded" />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
