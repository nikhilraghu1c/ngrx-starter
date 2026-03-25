import { createReducer, on } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';
import { groceryAction } from '../actions/grocery.action';

// const initialState: Grocery[] = [
//     { id: 1, name: "Milk", type: "drink" },
//     { id: 2, name: "Banana", type: "fruit" },
//     { id: 3, name: "Lays", type: "snacks" },
//     { id: 4, name: "doritos", type: "snacks" },
// ];

const initialState: Grocery[] = [];
export const groceryReducer = createReducer(
  initialState,
  on(groceryAction.loadGroceriesSuccess, (state, action) => {
    return action.groceries;
  }),
  on(groceryAction.loadGroceriesFailure, (state) => {
    return [];
  })
);
