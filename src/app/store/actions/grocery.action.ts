import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Grocery } from "../../../models/grocery.model";

// export const initGroceries = createAction('[Grocery] Load Groceries');
// export const completedGroceries = createAction('[Grocery] Load Groceries success');

// Instead of creating individual actions for each event, 
// we can use createActionGroup to group related actions together, 
// this is more efficient and cleaner way to define actions for a feature state,
export const groceryAction = createActionGroup(
    {
        source: 'Grocery API',
        events: {
            'Load Groceries': emptyProps(),
            'Load Groceries Success': props<{ groceries: Grocery[] }>(),
            'Load Groceries Failure': emptyProps()
        }
    }
);
