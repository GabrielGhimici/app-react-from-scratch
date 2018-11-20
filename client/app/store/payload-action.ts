import { Action } from 'redux';

export interface PayloadAction<T, V> extends Action {
  payload?: T,
  meta?: V,
  error?: any
}
