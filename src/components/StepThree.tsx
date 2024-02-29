import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

import Button from "../shared/Button";
import data from "../data/dishes.json";
import { OrderFood } from "../assets/data";
import { message } from "../common/until";

interface Values {
  number_dishes: [
    {
      dish: string;
      number_servings: number;
    }
  ];
}

interface Props {
  orderFood: OrderFood;
  setStepActive: React.Dispatch<React.SetStateAction<string>>;
  onsubmit: (value: Values, key: string) => void;
}

const SignupSchema = Yup.object().shape({
  number_dishes: Yup.array()
    .of(
      Yup.object().shape({
        dish: Yup.string().required("Select a Dish is required"),
        number_servings: Yup.number()
          .integer("Please enter an integer")
          .min(1, "Number servings cannot be less than 1!")
          .default(1),
      })
    )
    .required("Must have friends")
    .max(3, "Minimum of 10 friends"),
});

const StepThree: React.ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  props,
  ref
) => {
  const { setStepActive, orderFood, onsubmit } = props;

  return (
    <Formik
      initialValues={{
        number_dishes: [
          {
            dish: "",
            number_servings: 1,
          },
        ],
      }}
      validationSchema={SignupSchema}
      onSubmit={(values: Values) => {
        const totalDish = values.number_dishes
          .map((item) => item.number_servings)
          .reduce((total, current) => total + current);

        if (totalDish >= orderFood.number_people) {
          onsubmit(values, "4");
        } else {
          message.error(
            "The total number of dishes should be greater or equal to the number of people!"
          );
        }
      }}
    >
      {({ values, errors, touched }) => {
        return (
          <div>
            <Form className="flex flex-col gap-2 mt-[-40px]">
              <div className="relative flex flex-col gap-1">
                <FieldArray name="number_dishes">
                  {({ remove, push }) => (
                    <>
                      {values.number_dishes.map((itemValue, index) => {
                        const dishAdd = values.number_dishes.map(
                          (item) => item.dish
                        );

                        const renderOption = (dataOption: any) => {
                          return (
                            <div key={itemValue.dish + index}>
                              <div className="flex items-end gap-12">
                                <div className="flex flex-col gap-2 mt-10 relative">
                                  <h3 className="text-base">
                                    Please Select a Dish
                                  </h3>
                                  <Field
                                    as="select"
                                    name={`number_dishes.${index}.dish`}
                                    className=""
                                  >
                                    <option value="" disabled hidden>
                                      ---
                                    </option>

                                    {dataOption.map((item: any) => (
                                      <option
                                        value={item.name}
                                        key={item.id + item.name}
                                      >
                                        {item.name}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    name={`number_dishes.${index}.dish`}
                                    component="div"
                                    className="errors absolute bottom-0 mb-[-30px]"
                                  />
                                </div>

                                <div className="flex flex-col gap-2 mt-10 flex-1 relative">
                                  <h3 className="text-base">
                                    Please enter no. of servings
                                  </h3>
                                  <Field
                                    name={`number_dishes.${index}.number_servings`}
                                    type="number"
                                    min={1}
                                    autoComplete="off"
                                  />
                                  <ErrorMessage
                                    name={`number_dishes.${index}.number_servings`}
                                    component="div"
                                    className="errors absolute bottom-0 mb-[-30px]"
                                  />
                                </div>
                                <div className="flex justify-end items-end">
                                  {index === 0 ? (
                                    ""
                                  ) : (
                                    <MdDeleteOutline
                                      className="w-6 h-6 cursor-pointer"
                                      onClick={() => remove(index)}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        };

                        // chua chon gi
                        if (itemValue.dish === "" && dishAdd.length === 1) {
                          const dataDish1 = data.dishes.filter((itemOption) => {
                            const dish =
                              itemOption.availableMeals.includes(
                                orderFood.meal
                              ) &&
                              itemOption.restaurant === orderFood.restaurant;
                            return dish;
                          });

                          return renderOption(dataDish1);
                        }

                        // da chon
                        if (itemValue.dish === "" && dishAdd.length > 1) {
                          const dataDish2 = data.dishes.filter((itemOption) => {
                            const dish =
                              itemOption.availableMeals.includes(
                                orderFood.meal
                              ) &&
                              itemOption.restaurant === orderFood.restaurant &&
                              !dishAdd.includes(itemOption.name);
                            return dish;
                          });

                          return renderOption(dataDish2);
                        }
                        // chon 1
                        if (
                          dishAdd.includes(itemValue.dish) &&
                          dishAdd.length === 1
                        ) {
                          const dataDish3 = data.dishes.filter(
                            (itemOption2) => {
                              const dish =
                                itemOption2.availableMeals.includes(
                                  orderFood.meal
                                ) &&
                                itemOption2.restaurant === orderFood.restaurant;
                              return dish;
                            }
                          );
                          return renderOption(dataDish3);
                        }
                        // chon  no va xoa di nhung thang con lai
                        if (
                          dishAdd.includes(itemValue.dish) &&
                          dishAdd.length > 1
                        ) {
                          const convertDishAdd = dishAdd.filter(
                            (item) => item !== itemValue.dish
                          );
                          const dataDish4 = data.dishes.filter(
                            (itemOption2) => {
                              const dish =
                                itemOption2.availableMeals.includes(
                                  orderFood.meal
                                ) &&
                                itemOption2.restaurant ===
                                  orderFood.restaurant &&
                                !convertDishAdd.includes(itemOption2.name);
                              return dish;
                            }
                          );
                          return renderOption(dataDish4);
                        }
                      })}
                      {values.number_dishes.length >= 10 ? null : (
                        <IoAddCircleOutline
                          className="w-8 h-8 cursor-pointer mt-10"
                          onClick={() =>
                            push({
                              dish: "",
                              number_servings: 1,
                            })
                          }
                        />
                      )}
                    </>
                  )}
                </FieldArray>
              </div>

              <div className="flex items-center justify-between mt-20">
                <Button
                  type="button"
                  title="Previous"
                  onClick={() => setStepActive("2")}
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
          </div>
        );
      }}
    </Formik>
  );
};

export default React.forwardRef<HTMLButtonElement, Props>(StepThree);
