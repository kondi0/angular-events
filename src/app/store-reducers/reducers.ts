import { ActionReducerMap } from '@ngrx/store';
import { reducer as event } from '../core/reducers/event';
import { State } from '../models/store/state.interface';

export const reducers: ActionReducerMap<State> = {
    event
};
