import { Component, OnInit } from '@angular/core';
import { listAnimation } from '../../../animations/animations';
import { EventView } from '../../../models/events/event-view.interface';
import { GroupedDay } from '../../../models/events/grouped-day.interface';
import { EventsService } from '../../../services/events/events.service';
import { EventsStoreService } from '../../../services/events/events-store.service';
import { LocalstorageService } from '../../../services/events/localstorage-service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'my-events',
    templateUrl: './my-events.component.html',
    styleUrls: ['./my-events.component.scss'],
    animations: [listAnimation]
})
export class MyEventsComponent implements OnInit {
    groupedEvents: Array<GroupedDay>;

    constructor(
        private eventsService: EventsService,
        private eventsStoreService: EventsStoreService,
        private localstorageService: LocalstorageService
    ) {}

    ngOnInit() {
        this.eventsStoreService
            .getAllEvents()
            .pipe(
                map((events: Array<EventView>) =>
                    events.filter(({ id }: EventView) => this.localstorageService.getJoinedEventsList().includes(id))
                )
            )
            .subscribe((events: Array<EventView>) => {
                this.groupedEvents = this.eventsService.getGroupedEvents(events);
            });
    }
}
