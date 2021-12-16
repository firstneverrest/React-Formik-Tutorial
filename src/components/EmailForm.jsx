import react from 'react';
import { useFormik } from 'formik';

const initialValues = {
  name: '',
  email: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const EmailForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: validate,
  });

  const isNameValidated = formik.touched.name && formik.errors.name;
  const isEmailValidated = formik.touched.email && formik.errors.email;

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Email Form</h2>
      <section>
        <label htmlFor="name" className={isNameValidated ? 'error-label' : ''}>
          Name
        </label>
        <input
          type="text"
          name="name"
          className={isNameValidated ? 'error-input' : ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {isNameValidated ? (
          <p className="error-msg">{formik.errors.name}</p>
        ) : null}
      </section>

      <section>
        <label
          htmlFor="email"
          className={isEmailValidated ? 'error-label' : ''}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className={isEmailValidated ? 'error-input' : ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {isEmailValidated ? (
          <p className="error-msg">{formik.errors.email}</p>
        ) : null}
      </section>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailForm;
