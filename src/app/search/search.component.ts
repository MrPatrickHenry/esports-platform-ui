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
	import { environment } from '../../environments/environment';


	// models
	export interface ResponseObject {
		data: {
			arcades:{};
			playerData:{};
			titleData:{};
			tournamentData:{};
			contentData:{};
		}
	}




	@Component({
		selector: 'app-search',
		templateUrl: './search.component.html',
		styleUrls: ['./search.component.scss']
	})
	export class SearchComponent implements OnInit {

public apiURL: string = environment.apiUrl;
public searchTerm:string;
public arcadeSearchResults	:{};
public playerSearchResults:{};
public titleSearchResults:{};
public tournamentSearchResults:{};
public contentSearchResults:{};


constructor(private route: ActivatedRoute,public dialog: MatDialog,private spinner: NgxSpinnerService,private titleService: Title,private _snackBar: MatSnackBar,private httpClient: HttpClient,
private router: Router,private _bottomSheet: MatBottomSheet ) {}

public setTitle() {
this.titleService.setTitle( 'Arcade Profile Page' );
}

		ngOnInit() {
			this.searchFunction();
		}

		 searchFunction(){
                this.searchTerm = this.route.snapshot.paramMap.get("searchTerm");
                // to do User Angular Service
                const endpoint = 'search/'; 
                let postData = new FormData();
      			postData.append('id',this.searchTerm);
                //this should be 
                this.httpClient.post(this.apiURL + endpoint + this.searchTerm,postData)
                .subscribe( (res: ResponseObject) => {
       			 this.arcadeSearchResults = res.data.arcades;
        		 this.playerSearchResults = res.data.playerData;
        		 this.titleSearchResults = res.data.titleData;
        		 this.tournamentSearchResults = res.data.tournamentData;
        		 this.contentSearchResults = res.data.contentData;
        		 console.log(this.titleSearchResults);
                });
}




	}
