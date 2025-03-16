import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Add navigation

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(register(values));
      toast.success('Registration successful!');
      navigate('/login'); // ✅ Navigate to login after success
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username</label>
            <Field type="text" name="username" className="w-full p-2 border rounded" />
            <ErrorMessage name="username" component="div" className="text-red-500" />
          </div>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
