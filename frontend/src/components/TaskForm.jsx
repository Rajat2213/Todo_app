import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskService';
import { toast } from 'react-toastify';

const TaskForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(createTask(values));
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Add Task</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Title</label>
            <Field type="text" name="title" className="w-full p-2 border rounded" />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <Field as="textarea" name="description" className="w-full p-2 border rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;