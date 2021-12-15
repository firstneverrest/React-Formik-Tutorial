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
