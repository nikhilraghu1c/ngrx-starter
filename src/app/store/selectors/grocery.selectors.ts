import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

// export const selectGroceries = (state: { groceries: Grocery[]}) => state.groceries;
// above and below both are same for select groceries, but below is more efficient and recommended way to create selector for feature state,
export const selectGroceries = createFeatureSelector<Grocery[]>('groceries');

export const selectGroceriesByType = (type: string) =>
  createSelector(selectGroceries, (state: Grocery[]) =>
    state.filter((grocery) => grocery.type === type)
  );

// If we use selectors at multiple places,
// then it uses memoization and it will not recalculate the value if the state has not changed,
// it will return the cached value, this is useful for performance optimization.
