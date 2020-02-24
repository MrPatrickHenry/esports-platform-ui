// profile imports
import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {
HttpClient,
HttpParams,
HttpErrorResponse,
HttpResponse,
HttpHeaders,
HttpEventType } from '@angular/common/http';
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

// models
export interface ResponseObject {
data: {
result: {
userType:{};
};
}
}

export interface arcadeResponseObject{
data: {
arcade: {}
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
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})
export class DevelopersComponent implements OnInit {
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
constructor(public dialog: MatDialog,private spinner: NgxSpinnerService,private titleService: Title,private _snackBar: MatSnackBar,private httpClient: HttpClient,
private router: Router,private _bottomSheet: MatBottomSheet ) {}

  ngOnInit() {
		   this.setTitle();
this.userDetails();
this.spinner.hide();
  }


  public setTitle() {
this.titleService.setTitle( 'Profile Page' );
}

userDetails() {
	this.spinner.show();
	var AuthUser = localStorage.getItem('user');            
	var uid = localStorage.getItem('uid');
	let postData = new FormData();
	postData.append('id',uid);
	// to do User Angular Service
	var aToken = localStorage.getItem('token');
	const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
	//this should be 
	this.httpClient.post('https://20-twenty.online/api/v1/users/profile',postData,{headers})
	.subscribe( (res: arcadeResponseObject) => {
			this.arcadeData = res.data["0"].arcade["0"];
	});
}

}