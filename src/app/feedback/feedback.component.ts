import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  constructor(public dialog: MatDialog) { }


  openDialog(): void {

  // pid = uid;
  const dialogRef = this.dialog.open(dialogFeedback, {
    height: '100vh',
    panelClass: 'custom-modalbox',
  });
}

}


@Component({
  selector: 'dialogFeedback',
  templateUrl: 'dialogFeedback.html',
})

export class dialogFeedback {
  constructor(public dialogRef: MatDialogRef<dialogFeedback>) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  // response to send
}



