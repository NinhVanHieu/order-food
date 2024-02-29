import React from "react";
import { Col, Row } from "antd";

import { OrderFood, NumberDishes } from "../assets/data";
import Button from "../shared/Button";

interface props {
  orderFood: OrderFood;
  setStepActive: React.Dispatch<React.SetStateAction<string>>;
}

const StepReview: React.FC<props> = ({ orderFood, setStepActive }) => {
  return (
    <div className="flex flex-col gap-6">
      <Row>
        <Col span={12}>Meal</Col>
        <Col span={12}>{orderFood.meal}</Col>
      </Row>
      <Row>
        <Col span={12}>No of People</Col>
        <Col span={12}>{orderFood.number_people}</Col>
      </Row>
      <Row>
        <Col span={12}>Restaurant</Col>
        <Col span={12}>{orderFood.restaurant}</Col>
      </Row>
      <Row>
        <Col span={12}>Dishes</Col>
        <Col span={12}>
          <div className="border border-black flex flex-col gap-2">
            {orderFood.number_dishes.map((item: NumberDishes) => (
              <div
                className="flex py-1 px-3"
                key={item.dish + item.number_servings}
              >
                <span className="flex-1">{item.dish}</span>
                <div className="flex gap-10">
                  <span>-</span>
                  <span>{item.number_servings}</span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div className="flex items-center justify-between mt-10">
        <Button
          type="button"
          title="Previous"
          onClick={() => setStepActive("3")}
        />
        <Button
          type="submit"
          title="Submit"
          onClick={() => console.log("order-food", orderFood)}
        />
      </div>
    </div>
  );
};

export default StepReview;
