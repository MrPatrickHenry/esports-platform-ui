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
import { ActivatedRoute } from "@angular/router";
import { environment } from '../../../environments/environment';

export interface arcadeResponseObject{
data: {
        result: {};
        stats:{};
}
}

@Component({
	selector: 'app-arcades',
	templateUrl: './arcades.component.html',
	styleUrls: ['./arcades.component.scss']
})
export class ArcadesComponent implements OnInit {
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
public arcadeName:any;
public stats:any;
public apiURL: string = environment.apiUrl;

constructor(private route: ActivatedRoute,public dialog: MatDialog,private spinner: NgxSpinnerService,private titleService: Title,private _snackBar: MatSnackBar,private httpClient: HttpClient,
private router: Router,private _bottomSheet: MatBottomSheet ) {}

ngOnInit() {
this.setTitle();
this.arcadeDetails();
this.spinner.hide();
}


public setTitle() {
this.titleService.setTitle( 'Arcade Profile Page' );
}

arcadeDetails() {
                this.arcadeName = this.route.snapshot.paramMap.get("arcadeName");
		// to do User Angular Service
		var aToken = localStorage.getItem('token');
		const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                const endpoint = 'show/Arcade/'; 

		//this should be 
		this.httpClient.get(this.apiURL + endpoint + this.arcadeName,{headers})
		.subscribe( (res: arcadeResponseObject) => {
        this.arcadeData = res.data.result["0"];
        this.stats = res.data.stats;
		});
}

}