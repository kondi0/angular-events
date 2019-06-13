import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { reducers } from './store-reducers/reducers';
import { StoreModule } from '@ngrx/store';
import { EventEffects } from './core/effects/event';
import { EffectsModule } from '@ngrx/effects';
import { EventsService } from './services/events/events.service';
import { EventsHttpService } from './services/events/events-http.service';
import { EventsStoreService } from './services/events/events-store.service';
import { EventsTableComponent } from './containers/events/events-table/events-table.component';
import { LocalstorageService } from './services/events/localstorage-service';
import { EventsFilterComponent } from './components/events-filter/events-filter.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ToastModule.forRoot(),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([EventEffects])
    ],
    providers: [
        HttpClientModule,
        AuthService,
        AuthGuard,
        EventsService,
        EventsHttpService,
        EventsStoreService,
        LocalstorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
