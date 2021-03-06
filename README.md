# Formik Tutorial

Formik helps you build forms in React. Visit more information on [official website](https://formik.org/).

- Getting values in and out of form state
- Validation and error messages
- Handling form submission

## Technologies

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Formik-276DC3?style=for-the-badge&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Husky-42b983?style=for-the-badge&logoColor=white)

## Installation

```
# npm
npm i formik

# yarn
yarn add formik
```

## useFormik Hook

UseFormik hook manages form state, input value, onChange and submit function.

- formik.values - shows all values from every field.
- formik.errors - shows all errors from every field.
- formik.touched - shows all visited input field.

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

## Display Error Message

Use `formik.errors` to get error field.

```js
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Email Form</h2>
      <section>
        <label
          htmlFor="name"
          className={formik.errors.name ? 'error-label' : ''}
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          className={formik.errors.name ? 'error-input' : ''}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? (
          <p className="error-msg">{formik.errors.name}</p>
        ) : null}
      </section>

      <section>
        <label
          htmlFor="email"
          className={formik.errors.email ? 'error-label' : ''}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className={formik.errors.email ? 'error-input' : ''}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <p className="error-msg">{formik.errors.email}</p>
        ) : null}
      </section>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailForm;
```

## Visited Fields

After creating form validation, the behavior is when the user fill in the first field, other fields will show error. You can prevent this behavior with `onBlur={formik.handleBlur}` to keep track visited fields. Then, use `formik.touched` to create conditional rendering.

```js
<input
  type="email"
  name="email"
  className={formik.errors.email ? 'error-input' : ''}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.email}
/>;
{
  formik.touched.email && formik.errors.email ? (
    <p className="error-msg">{formik.errors.email}</p>
  ) : null;
}
```

## Schema Validation with Yup

Yup is a JavaScript schema builder for value parsing and validation. Instead of writing your own validation, use Yup to handle that.

```js
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
});

...

const formik = useFormik({
  initialValues,
  onSubmit,
  validationSchema, // instead of validate
});

```

## Refactoring Input Props

Formik provides `formik.getFieldProps('')` to reduce code in input field.

```js
// old way
<input
  type="email"
  name="email"
  className={formik.errors.email ? 'error-input' : ''}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.email}
/>;

// new way (replace three line of code)
<input
  type="email"
  name="email"
  className={isEmailValidated ? 'error-input' : ''}
  {...formik.getFieldProps('email')}
/>;
```

## Rendering other components inside Formik component

```js
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
```

## Husky

Husky provide git hook used to run test or linting before and after doing git command. For example, running test or linting before commit.

### Installation

1. Install husky

```
npm install husky -D
```

2. edit package.json to set up husky script

```
npm set-script prepare "husky install"
npm run prepare
```

3. add a hook

```
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

4. make a commit

```
git commit -m "feat: add husky hook"
```

Tip: you maybe encounter the problem that after running test with Jest, it doesn't exit from testing. So, you need to edit husky.sh hook file like below:

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test -- --watchAll=false

```

Add `-- --watchAll=false` after `npm test`
