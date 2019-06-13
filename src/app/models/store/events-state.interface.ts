import {EventView} from '../events/event-view.interface';

export interface EventsState {
    eventList?: Array<EventView>;
    filteredEvents?: Array<EventView>;
}
