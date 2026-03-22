import { createReducer, on } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';
import { addToBucket, removeFromBucket } from '../actions/bucket.action';

const initialState: Bucket[] = [];

export const bucketReducer = createReducer(
  initialState,
  on(addToBucket, (state, action) => {
    const payload = action.payload;
    const existingItem = state.find(item => item.id === payload.id);
    if(existingItem) {
        return state.map(item => 
            item.id === payload.id ? { ...item, quantity: item.quantity + payload.quantity } : item
        );
    }
    return [...state, action.payload];
  }),
  on(removeFromBucket, (state, action) => {
    const payload = action.payload;
    const existingItem = state.find(item => item.id === payload.id);
    if(existingItem) {
        if(existingItem.quantity > 1) {
            return state.map(item => 
                item.id === payload.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        }
        return state.filter(item => item.id !== payload.id);
    }
    return state;
  })
);
