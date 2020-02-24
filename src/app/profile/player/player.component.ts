// profile imports
import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {
HttpClient,
HttpParams,
HttpErrorResponse,
HttpResponse,
HttpHeaders,
HttpEventType } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { environment } from '../../../environments/environment';

// models
export interface ResponseObject {
data: {
    result: {};

}
}

export interface arcadeResponseObject{
data: {
  result:{};
arcade: {};
media:{};
team:{};
scores:{};
}
}
export interface teamResponseObject{
data:{
results: {}
}
}
export interface Types {
value:string;
viewValue: string;
}

export interface Lincenses{
value:string;
viewValue:string;
}

export interface TimeZone {
value:string;
viewValue: string;
}

export interface Arcade {
value:string;
viewValue:string;
}

export interface User {
name: string;
}
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
        
displayedColumns: string[] = ['gameTitle','arcadeName', 'score','submitted'];
dataSource:any;

        @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

uid : string;
pid:  string;


public user: string;
public selectedFile: File;
public selectedImageUrl: string;
public isMobile: boolean;
public AuthUser:string;
public users:any;
public media:any;
public arcadeData:any;
public userAuth:string;
public teamData:any;
public gamerTag:any;
public scoresData:{};
public apiURL: string = environment.apiUrl;
public usersPublic;
constructor(private route: ActivatedRoute, public dialog: MatDialog,private spinner: NgxSpinnerService,private titleService: Title,private _snackBar: MatSnackBar,private httpClient: HttpClient,
private router: Router,private _bottomSheet: MatBottomSheet ) {}

//Initialisation
ngOnInit() {
  	this.setTitle();
this.userDetails();
this.spinner.hide();
  }

public setTitle() {
this.titleService.setTitle( 'Profile Page' );
}

userDetails() {
    this.gamerTag = this.route.snapshot.paramMap.get("gamertag")
    this.spinner.show();
    let postData = new FormData();
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'show/'; 

    this.httpClient.get(this.apiURL + endpoint + this.gamerTag,{headers})
    .subscribe( (res: arcadeResponseObject) => {
      this.usersPublic = res.data;
      console.log(this.usersPublic);
        this.users = res.data.result["0"];
        this.userAuth = res.data.result["0"].userType;
        this.media = res.data.media;
        this.teamData = res.data.team["0"];
        this.scoresData = res.data.scores;
        this.dataSource = new MatTableDataSource(res.data["0"].scores);

       console.log(this.dataSource);



    });
}

}
