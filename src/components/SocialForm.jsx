import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from 'formik';
import TextError from './TextError';
import * as Yup from 'yup';

const initialValues = {
  social: {
    facebook: '',
    line: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  pNumbers: [''],
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  social: Yup.object().shape({
    facebook: Yup.string().required('Facebook is Required'),
    line: Yup.string().required('Line is Required'),
    twitter: Yup.string().required('Twitter is Required'),
  }),
});

const SocialForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <h2>Social Form</h2>
        <section>
          <label htmlFor="facebook">Facebook</label>
          <Field type="text" id="facebook" name="social.facebook" />
          <ErrorMessage name="social.facebook" component={TextError} />
        </section>

        <section>
          <label htmlFor="line">Line</label>
          <Field type="text" id="line" name="social.line" />
          <ErrorMessage name="social.line" component={TextError} />
        </section>

        <section>
          <label htmlFor="twitter">Twitter</label>
          <Field type="text" id="twitter" name="social.twitter" />
          <ErrorMessage name="social.twitter" component={TextError} />
        </section>

        <section>
          <label htmlFor="primaryPhone">Primary Phone Number</label>
          <Field type="text" id="primaryPhone" name="phoneNumbers[0]" />
          <ErrorMessage name="phoneNumbers[0]" component={TextError} />
        </section>

        <section>
          <label htmlFor="secondaryPhone">Secondary Phone Number</label>
          <Field type="text" id="secondaryPhone" name="phoneNumbers[1]" />
          <ErrorMessage name="phoneNumbers[1]" component={TextError} />
        </section>

        <section>
          <label>List of phone numbers</label>
          <FieldArray name="pNumbers">
            {(FieldArrayProps) => {
              const { push, remove, form } = FieldArrayProps;
              const { values } = form;
              const { pNumbers } = values;
              return (
                <div>
                  {pNumbers.map((pNumber, index) => (
                    <div key={index}>
                      <FastField name={`pNumbers[${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      )}
                      <button type="button" onClick={() => push('')}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </section>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SocialForm;
