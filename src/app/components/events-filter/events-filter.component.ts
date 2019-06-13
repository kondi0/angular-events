import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventFilter } from '../../models/filter/event-filter.interface';
import { TimeOfDay } from '../../models/filter/time-of-day.enum';

@Component({
    selector: 'events-filter',
    templateUrl: './events-filter.component.html',
    styleUrls: ['./events-filter.component.scss']
})
export class EventsFilterComponent implements OnInit {
    @Output() filterEvents: EventEmitter<EventFilter> = new EventEmitter<EventFilter>();

    filter: EventFilter = {};
    TimeOfDay: typeof TimeOfDay = TimeOfDay;

    constructor() {}

    ngOnInit() {}

    updateDayTime(dayTime: TimeOfDay) {
        this.filter.timeOfDay = dayTime === this.filter.timeOfDay ? null : dayTime;
        this.filterEvents.emit(this.filter);
    }

    updateFilter() {
        this.filterEvents.emit(this.filter);
    }

    toggleFree() {
        this.filter.free = !this.filter.free;
        this.filterEvents.emit(this.filter);
    }
}
