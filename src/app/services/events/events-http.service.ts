import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../models/events/event.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { City } from '../../models/cities/city.interface';
import { EventView } from '../../models/events/event-view.interface';
import * as moment from 'moment-timezone';
import { LocalstorageService } from './localstorage-service';

@Injectable()
export class EventsHttpService {
    readonly api = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private feedback: ToastsManager,
        private translate: TranslateService,
        private localstorageService: LocalstorageService
    ) {}

    getEvents(): Observable<Array<EventView>> {
        return forkJoin(
            this.http
                .get<Array<Event>>(`${this.api}/events`)
                .pipe(catchError(() => Observable.throw(this.errorHandler()))),
            this.http
                .get<Array<Event>>(`${this.api}/cities`)
                .pipe(catchError(() => Observable.throw(this.errorHandler())))
        ).map(([events, cities]: [Array<Event>, Array<City>]) => {
            return events.map((event: Event) => this.getEventView(event, cities));
        });
    }

    private getEventView(event: Event, cities: Array<City>): EventView {
        return {
            id: event.id,
            name: event.name,
            isFree: event.isFree,
            city: this.getCity(cities, event),
            duration: this.getDuration(event),
            startDate: this.applyTimeZone(event),
            joined: this.localstorageService.getJoinedEventsList().includes(event.id)
        };
    }

    private getDuration(event: Event): number {
        return moment.duration(moment(event.endDate).diff(event.startDate)).asHours();
    }

    private getCity(cities: Array<City>, event: Event): City {
        return cities.find(({ id }: City) => {
            return event.city === id;
        });
    }
    private applyTimeZone({ startDate }: Event): Date {
        return moment(startDate)
            .tz(moment.tz.guess())
            .toDate();
    }

    private errorHandler(): void {
        this.translate.get('apierror').subscribe((messageTranslation: string) => {
            this.feedback.error(messageTranslation, 'Error');
        });
    }
}
