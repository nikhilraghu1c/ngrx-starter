import { Actions, createEffect, ofType } from '@ngrx/effects';
import { groceryAction } from '../actions/grocery.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { GroceryService } from '../../grocery.service';
import { inject } from '@angular/core';

// With the introduction of functional effects in NgRx, we can define effects as standalone functions without needing to create a class.
export const loadGroceries = createEffect(
  (action$ = inject(Actions), grocerySrv = inject(GroceryService)) => {
    return action$.pipe(
      ofType(groceryAction.loadGroceries),
      exhaustMap(() =>
        grocerySrv.fetchAllGroceries().pipe(
          // On success, we can dispatch a success action with the groceries data
          map((groceries: any) =>
            groceryAction.loadGroceriesSuccess({ groceries })
          ),
          // In case of error, we can dispatch a failure action here
          catchError(() => of(groceryAction.loadGroceriesFailure()))
        )
      )
    );
  },
  { functional: true }
);

// This is the class-based version of the effect, but with the introduction of functional effects in NgRx, 
// we can define effects as standalone functions without needing to create a class.

// @Injectable()
// export class GroceryEffects {
//   loadGroceries$ = createEffect(() =>
//     this.action$.pipe(
//       ofType(groceryAction.loadGroceries),
//       exhaustMap(() =>
//         this.grocerySrv.fetchAllGroceries().pipe(
//           // On success, we can dispatch a success action with the groceries data
//           map((groceries: any) =>
//             groceryAction.loadGroceriesSuccess({ groceries })
//           ),
//           // In case of error, we can dispatch a failure action here
//           catchError(() => of(groceryAction.loadGroceriesFailure()))
//         )
//       )
//     )
//   );

//   constructor(private action$: Actions, private grocerySrv: GroceryService) {}
// }
