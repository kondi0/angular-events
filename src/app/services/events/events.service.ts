import { Injectable } from '@angular/core';
import { GroupedDay } from '../../models/events/grouped-day.interface';
import * as moment from 'moment-timezone';
import { EventView } from '../../models/events/event-view.interface';
import { LocalstorageService } from './localstorage-service';
import { EventsStoreService } from './events-store.service';

@Injectable()
export class EventsService {
    readonly dateCompareFormat = 'DD/MM/YY';

    constructor(private localstorageService: LocalstorageService, private eventsStoreService: EventsStoreService) {}

    getGroupedEvents(events: Array<EventView>): Array<GroupedDay> {
        return events
            .sort((firstEventView: EventView, secondEventView: EventView) =>
                this.sortByDate(firstEventView.startDate, secondEventView.startDate)
            )
            .reduce(
                (dayList: Array<GroupedDay>, eventView: EventView) => this.getGroupedDayList(dayList, eventView),
                []
            )
            .sort((firstGroupedDay: GroupedDay, secondGroupedDay: GroupedDay) =>
                this.sortByDate(firstGroupedDay.title, secondGroupedDay.title)
            );
    }

    addJoinedEvent(id: number): void {
        const userName = this.localstorageService.getUserName();
        const joinedEventsMap: Map<string, Array<number>> = this.localstorageService.getJoinedEventsMap();
        const joinedEventsList: Array<number> = joinedEventsMap.get(userName) || [];
        joinedEventsMap.set(userName, [...joinedEventsList, id]);

        this.localstorageService.setJoinedEventsMap(joinedEventsMap);
    }

    removeJoinedEvent(id: number): void {
        const userName = this.localstorageService.getUserName();
        const joinedEventsMap: Map<string, Array<number>> = this.localstorageService.getJoinedEventsMap();
        const joinedEventsList: Array<number> = joinedEventsMap.get(userName) || [];
        joinedEventsMap.set(userName, [...joinedEventsList.filter((joinedEvent: number) => joinedEvent !== id)]);

        this.localstorageService.setJoinedEventsMap(joinedEventsMap);
        this.eventsStoreService.removeJoined(id);
    }

    private sortByDate(firstDate: Date, secondDate: Date) {
        return firstDate.getTime() - secondDate.getTime();
    }

    private getGroupedDayList(dayList: Array<GroupedDay>, eventView: EventView): Array<GroupedDay> {
        const existing: GroupedDay = dayList.find(
            ({ title }: GroupedDay) => this.getFormattedDate(title) === this.getFormattedDate(eventView.startDate)
        );
        if (!!!existing) {
            dayList.push({
                title: eventView.startDate,
                events: [eventView]
            });
        } else {
            existing.events = [...existing.events, eventView];
        }
        return dayList;
    }

    private getFormattedDate(date: Date): string {
        return moment(date).format(this.dateCompareFormat);
    }
}
