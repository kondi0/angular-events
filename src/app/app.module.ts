import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store-reducers/reducers';
import { EffectsModule } from '@ngrx/effects';
import { EventEffects } from './core/effects/event';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalstorageService } from './services/events/localstorage-service';
import { EventsStoreService } from './services/events/events-store.service';
import { EventsHttpService } from './services/events/events-http.service';
import { EventsService } from './services/events/events.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToastrModule } from 'ngx-toastr';

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
        ToastrModule.forRoot(),
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
