import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import * as yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  comment: '',
  address: '',
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
          <Field type="text" id="name" name="name" placeholder="Your Name" />
          <ErrorMessage name="name" component={TextError} />
        </section>

        <section>
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="demo@example.com"
          />
          <ErrorMessage name="email">
            {(error) => <div className="error-label">{error}</div>}
          </ErrorMessage>
        </section>

        <section>
          <label htmlFor="comment">Comment</label>
          <Field id="comment" name="comment" as="textarea" />
        </section>

        <section>
          <label htmlFor="address">Address</label>
          <Field name="address">
            {({ field, form, meta }) => {
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              );
            }}
          </Field>
        </section>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EmailForm;
