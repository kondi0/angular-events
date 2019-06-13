import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from '../reducers/event';
import { EventsState } from '../../models/store/events-state.interface';

export const getEventState = createFeatureSelector<EventsState>('event');

export const getEventList = createSelector(getEventState, fromEvent.getEventList);
export const getFilteredEventList = createSelector(getEventState, fromEvent.getFilteredEventList);
