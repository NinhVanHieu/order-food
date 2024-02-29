export interface NumberDishes {
  dish: string;
  number_servings: number;
}

export interface OrderFood {
  meal: string;
  number_people: number;
  restaurant: string;
  number_dishes: NumberDishes[];
}
