import { Component, OnInit } from '@angular/core';
import { EventsHttpService } from '../../../services/events/events-http.service';
import { Event } from '../../../models/events/event.interface';
import { FilterTitlePipe } from '../../../pipes/filter-title.pipe';
import { listAnimation } from '../../../animations/animations';
import { City } from '../../../models/cities/city.interface';
import { EventView } from '../../../models/events/event-view.interface';
import { GroupedDay } from '../../../models/events/grouped-day.interface';
import { EventsService } from '../../../services/events/events.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { EventsStoreService } from '../../../services/events/events-store.service';
import { LocalstorageService } from '../../../services/events/localstorage-service';

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
            .map((events: Array<EventView>) =>
                events.filter(({ id }: EventView) => this.localstorageService.getJoinedEventsList().includes(id))
            )
            .subscribe((events: Array<EventView>) => {
                this.groupedEvents = this.eventsService.getGroupedEvents(events);
            });
    }
}
