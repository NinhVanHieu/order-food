import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import { ToastContainer } from "react-toastify";

import { OrderFood } from "./assets/data";
import StepReview from "./components/StepReview";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";

interface Values {
  meal?: string;
  number_people?: number;
  restaurant?: string;
  number_dishes?: [
    {
      dish: string;
      number_servings: number;
    }
  ];
}

const App: React.FC = () => {
  const [stepActive, setStepActive] = useState<string>("1");

  const [orderFood, setOrderFood] = useState<OrderFood>({
    meal: "",
    number_people: 1,
    restaurant: "",
    number_dishes: [
      {
        dish: "",
        number_servings: 1,
      },
    ],
  });

  // test
  const ref = React.createRef<HTMLButtonElement>();

  const onSubmit = (values: Values, key: string) => {
    setOrderFood({ ...orderFood, ...values });
    setStepActive(key);
  };

  const items = [
    {
      key: "1",
      label: "Step 1",
      children: <StepOne onsubmit={onSubmit} ref={ref} />,
    },
    {
      key: "2",
      label: "Step 2",
      children: (
        <StepTwo
          setStepActive={setStepActive}
          orderFood={orderFood}
          onsubmit={onSubmit}
          ref={ref}
        />
      ),
    },
    {
      key: "3",
      label: "Step 3",
      children: (
        <StepThree
          setStepActive={setStepActive}
          orderFood={orderFood}
          onsubmit={onSubmit}
          ref={ref}
        />
      ),
    },
    {
      key: "4",
      label: "Review",
      children: (
        <StepReview orderFood={orderFood} setStepActive={setStepActive} />
      ),
    },
  ];

  const onChange = (key: string) => {
    if (
      Number(key) > Number(stepActive) &&
      Number(key) == Number(stepActive) + 1
    ) {
      // to do
      // onClik Tab corresponding button Next
      // ref.current?.click();
      // setStepActive(key);
    }

    if (Number(key) < Number(stepActive)) {
      setStepActive(key);
    }
  };

  return (
    <div className="flex items-center justify-center py-[100px]">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        className="custom_toast"
      />
      <Tabs
        defaultActiveKey={stepActive}
        activeKey={stepActive}
        items={items}
        onChange={onChange}
        className="customTabs flex flex-col gap-10"
      />
    </div>
  );
};

export default App;
