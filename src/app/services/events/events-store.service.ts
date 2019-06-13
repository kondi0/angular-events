import { Injectable } from '@angular/core';
import { Event } from '../../models/events/event.interface';
import { City } from '../../models/cities/city.interface';
import { GroupedDay } from '../../models/events/grouped-day.interface';
import * as moment from 'moment-timezone';
import { EventView } from '../../models/events/event-view.interface';
import { State } from '../../models/store/state.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as eventSelectors from '../../core/selectors/event.selectors';
import {FilterEvents, GetAllEvents, RemoveJoined} from '../../core/actions/event';
import {EventFilter} from '../../models/filter/event-filter.interface';

@Injectable()
export class EventsStoreService {
    constructor(private store: Store<State>) {}

    getAllEvents(): Observable<Array<EventView>> {
        return this.store.select(eventSelectors.getEventList);
    }

    getFilteredEvents(): Observable<Array<EventView>> {
        return this.store.select(eventSelectors.getFilteredEventList);
    }

    dispatchSearch() {
        this.store.dispatch(new GetAllEvents());
    }

    dispatchFilter(filter: EventFilter) {
        this.store.dispatch(new FilterEvents(filter));
    }

    removeJoined(id: number) {
        this.store.dispatch(new RemoveJoined(id));
    }
}
