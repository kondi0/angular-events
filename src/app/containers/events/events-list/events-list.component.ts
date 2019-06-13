import { Component, OnInit } from '@angular/core';
import { EventView } from '../../../models/events/event-view.interface';
import { GroupedDay } from '../../../models/events/grouped-day.interface';
import { EventsService } from '../../../services/events/events.service';
import { EventsStoreService } from '../../../services/events/events-store.service';
import { EventFilter } from '../../../models/filter/event-filter.interface';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
    groupedEvents: Array<GroupedDay>;

    constructor(private eventsService: EventsService, private eventsStoreService: EventsStoreService) {}

    ngOnInit() {
        this.eventsStoreService.getFilteredEvents().subscribe((events: Array<EventView>) => {
            this.groupedEvents = this.eventsService.getGroupedEvents(events);
        });
    }

    filterEvents(filter: EventFilter) {
        this.eventsStoreService.dispatchFilter(filter);
    }
}
