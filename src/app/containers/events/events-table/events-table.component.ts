import { Component, Input, OnInit } from '@angular/core';
import { GroupedDay } from '../../../models/events/grouped-day.interface';
import { listAnimation } from '../../../animations/animations';
import { EventsService } from '../../../services/events/events.service';

@Component({
    selector: 'events-table',
    templateUrl: './events-table.component.html',
    styleUrls: ['./events-table.component.scss'],
    animations: [listAnimation]
})
export class EventsTableComponent implements OnInit {
    @Input() groupedEvents: Array<GroupedDay>;
    @Input() showCancel = false;

    constructor(private eventsService: EventsService) {}

    ngOnInit() {}

    joinEvent(id: number) {
        this.eventsService.addJoinedEvent(id);
    }

    cancelEvent(id: number) {
        this.eventsService.removeJoinedEvent(id);
    }
}
