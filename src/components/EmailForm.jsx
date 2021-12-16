import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const initialValues = {
  name: '',
  email: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
});

const EmailForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <h2>Email Form</h2>
        <section>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="p" className="error-msg" />
        </section>

        <section>
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="p" className="error-msg" />
        </section>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EmailForm;
