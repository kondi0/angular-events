import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventView } from '../../models/events/event-view.interface';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    event: EventView;
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data: EventView) {
        this.event = data;
    }

    ngOnInit() {}

    confirm() {
        this.dialogRef.close(this.event.id);
    }

    close() {
        this.dialogRef.close();
    }
}
