import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventsFilterComponent } from '../../components/events-filter/events-filter.component';

export const routes: Routes = <Routes>[
    {
        path: '',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: EventsListComponent
            },
            {
                path: 'my',
                component: MyEventsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatDialogModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule
    ],
    declarations: [
        CardComponent,
        ConfirmDialogComponent,
        MyEventsComponent,
        EventsListComponent,
        EventsTableComponent,
        EventsFilterComponent
    ],
    entryComponents: [ConfirmDialogComponent]
})
export class EventsModule {}
