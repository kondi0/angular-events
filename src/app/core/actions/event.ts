import { Action } from '@ngrx/store';
import { EventView } from '../../models/events/event-view.interface';
import { EventFilter } from '../../models/filter/event-filter.interface';

export const GET_ALL_EVENTS = '[Event] Get all';
export const GET_FILTERED_EVENTS = '[Event] Get filtered';
export const REMOVE_JOINED_EVENT = '[Event] Remove joined event';
export const SET_ALL_EVENTS = '[Event] Set all';
export const FILTER_EVENTS = '[Event] Filter events';

export class GetAllEvents implements Action {
    readonly type = GET_ALL_EVENTS;
}

export class GetFilteredEvents implements Action {
    readonly type = GET_FILTERED_EVENTS;
}

export class FilterEvents implements Action {
    readonly type = FILTER_EVENTS;
    constructor(public payload: EventFilter) {}
}

export class SetAllEvents implements Action {
    readonly type = SET_ALL_EVENTS;

    constructor(public payload: Array<EventView>) {}
}

export class RemoveJoined implements Action {
    readonly type = REMOVE_JOINED_EVENT;

    constructor(public payload: number) {}
}

export type Actions = GetAllEvents | SetAllEvents | RemoveJoined | GetFilteredEvents | FilterEvents;
