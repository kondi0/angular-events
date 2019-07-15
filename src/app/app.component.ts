import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/auth/user.interface';
import { environment } from '../environments/environment';
import { EventsStoreService } from './services/events/events-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private user: User;

    constructor(
        private translate: TranslateService,
        private authService: AuthService,
        private toastr: ToastrService,
        private eventsStoreService: EventsStoreService
    ) {
        this.translate.setDefaultLang('en-UK');
        this.translate.use('en-UK');
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem(environment.userInfo));
        this.authService.user.subscribe((user: User) => {
            this.user = { ...user };
        });
        this.eventsStoreService.dispatchSearch();
    }

    logout() {
        this.authService.logout();
    }
}
