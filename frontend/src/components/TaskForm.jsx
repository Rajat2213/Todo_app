import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const TaskForm = () => {
  const dispatch = useDispatch();
  const initialValues = { title: "", description: "" };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(createTask(values));
      toast.success("Task created successfully! 🎉");
      resetForm();
    } catch (error) {
      toast.error(error.message || "Failed to create task ❌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">➕ Add Task</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Title</label>
              <Field
                type="text"
                name="title"
                className="w-full p-2 text-white border rounded bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full text-white p-2 border rounded bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default TaskForm;
