import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addToBucket,
  removeFromBucket,
} from '../../store/actions/bucket.action';
import {
  selectGroceries,
  selectGroceriesByType,
} from '../../store/selectors/grocery.selectors';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css',
})
export class GroceryComponent {
  groceries$?: Observable<Grocery[]>;

  constructor(private store: Store<{ groceries: Grocery[] }>) {
    this.groceries$ = this.store.select(selectGroceries);
    // Instead of select everywhere, we can also use selectSignal but selectsignal will work in case of zoneless app and we have to make our app zoneless in app config
    // this.groceriesSignal = this.store.selectSignal(selectGroceries);
  }

  onTypeChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    if (selectedType) {
      this.groceries$ = this.store.select(selectGroceriesByType(selectedType));
    } else {
      this.groceries$ = this.store.select(selectGroceries);
    }
  }

  increment(item: Grocery) {
    const payload = {
      id: item.id,
      name: item.name,
      quantity: 1,
    };
    this.store.dispatch(addToBucket({ payload }));
  }
  decrement(item: Grocery) {
    const payload = {
      id: item.id,
    };
    this.store.dispatch(removeFromBucket({ payload }));
  }
}
