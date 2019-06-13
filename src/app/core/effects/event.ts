import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { GET_ALL_EVENTS, GetAllEvents, SetAllEvents } from '../actions/event';
import { EventsHttpService } from '../../services/events/events-http.service';
import { EventView } from '../../models/events/event-view.interface';
import { State } from '../../models/store/state.interface';
import { Store } from '@ngrx/store';
import * as eventSelectors from '../../core/selectors/event.selectors';
import 'rxjs/add/operator/exhaustMap';

@Injectable()
export class EventEffects {
    @Effect()
    getAll = this.actions
        .ofType(GET_ALL_EVENTS)
        .withLatestFrom(this.store.select(eventSelectors.getEventList))
        .filter(([action, events]: [GetAllEvents, Array<EventView>]) => !events.length)
        .exhaustMap(() =>
            this.eventsHttpService.getEvents().map((results: Array<EventView>) => {
                return new SetAllEvents(results);
            })
        );

    constructor(private actions: Actions, private eventsHttpService: EventsHttpService, private store: Store<State>) {}
}
