import { environment } from '../../../environments/environment';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
    getJoinedEventsMap(): Map<string, Array<number>> {
        return new Map<string, Array<number>>(JSON.parse(localStorage.getItem(environment.joinedEvents)));
    }

    getJoinedEventsList(): Array<number> {
      return this.getJoinedEventsMap().get(this.getUserName()) || [];
    }

    getUserName(): string {
        return JSON.parse(localStorage.getItem(environment.userInfo)).userName;
    }

    setJoinedEventsMap(map: Map<string, Array<number>>) {
      localStorage.setItem(environment.joinedEvents, JSON.stringify(Array.from(map.entries())));
    }
}
