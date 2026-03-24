import { createAction, props } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';

export const addToBucket = createAction(
  '[Bucket] Add Item',
  props<{ payload: Bucket }>() // () is used to define the type of the payload, in this case it's Bucket, 
  // instead of props we can also use payload: Bucket, but props is more flexible 
  // and allows us to define multiple properties 
);

export const removeFromBucket = createAction(
  '[Bucket] Remove Item',
  props<{ payload: Partial<Bucket> }>()
);
