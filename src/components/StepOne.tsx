import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface Values {
  meal: string;
  number_people: number;
}

interface Props {
  onsubmit: (value: Values, key: string) => void;
}

const SignupSchema = Yup.object().shape({
  meal: Yup.string().required("Select a meal is required"),
  number_people: Yup.number()
    .min(1, "Number of people is an integer from 1 to 10")
    .max(10, "Number of people is an integer from 1 to 10")
    .integer("Number of people is an integer from 1 to 10")
    .default(1),
});

const StepOne: React.ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  props,
  ref
) => {
  const { onsubmit } = props;
  const initialValues: Values = { meal: "", number_people: 1 };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          onsubmit(values, "2");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-base">Please Select a meal</h3>
              <Field as="select" name="meal" className="custom-select">
                <option value="" disabled hidden>
                  ---
                </option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </Field>
              {errors.meal && touched.meal ? (
                <div className="errors">{errors.meal}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 items-start  mt-10">
              <h3 className="text-base">Please Enter Number of people</h3>
              <Field
                name="number_people"
                type="number"
                min={1}
                max={10}
                autoComplete="off"
              />
              {errors.number_people && touched.number_people ? (
                <div className="errors">{errors.number_people}</div>
              ) : null}
            </div>
            <div className="flex justify-end mt-10">
              <button
                ref={ref}
                className="border-2 border-black py-1 px-2"
                type="submit"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.forwardRef<HTMLButtonElement, Props>(StepOne);
