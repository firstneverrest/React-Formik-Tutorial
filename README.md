# Formik Tutorial

Formik helps you build forms in React. Visit more information on [official website](https://formik.org/).

- Getting values in and out of form state
- Validation and error messages
- Handling form submission

## Installation

```
# npm
npm i formik

# yarn
yarn add formik
```

## useFormik Hook

UseFormik hook manages form state, input value, onChange and submit function.

```js
import react from 'react';
import { useFormik } from 'formik';

const EmailForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailForm;
```

## Form Validation

Use validate prop to validate your input fields.

```js
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

const formik = useFormik({
  initialValues: initialValues,
  onSubmit: onSubmit,
  validate: validate,
});
```
