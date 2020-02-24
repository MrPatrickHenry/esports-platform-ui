import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.scss']
})
export class DiscordComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {

  // pid = uid;
  const dialogRef = this.dialog.open(discordDialog, {
    height: '500px',
    width: '38% !important',          
    panelClass: 'custom-modalbox',
  });
}

}


@Component({
  selector: 'discordDialog',
  templateUrl: 'discordDialog.html',
})

export class discordDialog {
  constructor(public dialogRef: MatDialogRef<discordDialog>) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  // response to send
}
