import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import data from "../data/dishes.json";
import { OrderFood } from "../assets/data";
import Button from "../shared/Button";

interface Values {
  restaurant: string;
}

interface Props {
  orderFood: OrderFood;
  setStepActive: React.Dispatch<React.SetStateAction<string>>;
  onsubmit: (value: Values, key: string) => void;
}

const SignupSchema = Yup.object().shape({
  restaurant: Yup.string().required("Select a Restaurant is required"),
});

const Step2: React.ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  props,
  ref
) => {
  const { setStepActive, orderFood, onsubmit } = props;

  const dataRestaurant = data.dishes.filter((item) => {
    const restaurant = item.availableMeals.includes(orderFood.meal);
    return restaurant;
  });

  const dataRestaurantFilter = dataRestaurant.map((item) => item.restaurant);
  const renderData = dataRestaurantFilter.filter(
    (item, index) => dataRestaurantFilter.indexOf(item) === index
  );

  const initialValues: Values = { restaurant: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        onsubmit(values, "3");
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex flex-col gap-2">
            <h3 className="text-base">Please Select a Restaurant</h3>
            <Field as="select" name="restaurant" className="">
              <option value="" disabled hidden>
                ---
              </option>
              {renderData.map((item, index) => {
                return (
                  <option value={item} key={item + index}>
                    {item}
                  </option>
                );
              })}
            </Field>
            {errors.restaurant && touched.restaurant ? (
              <div className="errors">{errors.restaurant}</div>
            ) : null}
          </div>

          <div className="flex items-center justify-between mt-20">
            <Button
              type="button"
              title="Previous"
              onClick={() => setStepActive("1")}
            />
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
  );
};
export default React.forwardRef<HTMLButtonElement, Props>(Step2);
