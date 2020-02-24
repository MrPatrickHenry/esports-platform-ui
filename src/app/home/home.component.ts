import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../data.service';
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
	HttpResponse,
	HttpHeaders,
	HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl,ReactiveFormsModule  } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Title } from '@angular/platform-browser';
// import { Observable, Subject, asapScheduler, pipe, of, from,
	//   interval, merge, fromEvent } from 'rxjs';
	import { filter, scan } from 'rxjs/operators';
	import { Router,ActivatedRoute } from '@angular/router';


	export interface ResponseObject {
		data: {
			arcade:{};
			result: {
				userType: {};
			};

		}
	}


	@Component({
		selector: 'app-home',
		templateUrl: './home.component.html',
		styleUrls: ['./home.component.scss']
	})

	export class HomeComponent implements OnInit {

		constructor(public dialog: MatDialog, private spinner: NgxSpinnerService, private titleService: Title, private _snackBar: MatSnackBar, private httpClient: HttpClient,
			private router: Router, private _bottomSheet: MatBottomSheet) { }

		ngOnInit() {
		}

		goSignup(){
			this.router.navigate(['/signin']);
		}


}
