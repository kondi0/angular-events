import {EventView} from './event-view.interface';

export interface GroupedDay {
    title: Date;
    events: Array<EventView>;
}
