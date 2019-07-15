import {  Injectable } from '@angular/core';
import { JOINED_EVENTS, USER_INFO } from '../../constants/constants';

@Injectable()
export class LocalstorageService {
    getJoinedEventsMap(): Map<string, Array<number>> {
        return new Map<string, Array<number>>(JSON.parse(localStorage.getItem(JOINED_EVENTS)));
    }

    getJoinedEventsList(): Array<number> {
      return this.getJoinedEventsMap().get(this.getUserName()) || [];
    }

    getUserName(): string {
        return JSON.parse(localStorage.getItem(USER_INFO)).userName;
    }

    setJoinedEventsMap(map: Map<string, Array<number>>) {
      localStorage.setItem(JOINED_EVENTS, JSON.stringify(Array.from(map.entries())));
    }
}
