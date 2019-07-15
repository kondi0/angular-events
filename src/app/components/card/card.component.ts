import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventView } from '../../models/events/event-view.interface';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'event-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() event: EventView;
    @Input() showCancel: boolean;
    @Output() joinEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output() cancelEvent: EventEmitter<number> = new EventEmitter<number>();

    hoveredButton = false;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    openModal() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.data = this.event;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef
            .afterClosed()
            .pipe(filter((data: number) => !!data))
            .subscribe((data: number) => {
                this.joinEvent.emit(data);
                this.event.joined = true;
            });
    }

    cancel() {
        this.cancelEvent.emit(this.event.id);
    }
}
