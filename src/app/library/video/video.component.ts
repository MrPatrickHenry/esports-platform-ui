import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {trigger, transition, animate, style } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
	HttpResponse,
	HttpHeaders } from '@angular/common/http';
	import {  MatSnackBar } from '@angular/material/snack-bar';
	import {  Router,ActivatedRoute } from '@angular/router';
	import { Title }     from '@angular/platform-browser';
	import { DeviceDetectorService } from 'ngx-device-detector';
	import { environment } from '../../../environments/environment';
export interface ResponseObject {
		data: {
			tournament:any;
			eventPreperation:any;
			socialGrowth:any;
			rulesRecord:any;
			postTournament:any;
			result:any;

		}
	}

	
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],

})




export class VideoComponent implements OnInit {
		public apiURL: string = environment.apiUrl;
		public contentLockerItems:any;

		constructor(private _snackBar: MatSnackBar,
			private httpClient: HttpClient,public dialog: MatDialog,
			private spinner: NgxSpinnerService,private router: Router) {}


   ngOnInit() {
			this.spinner.show();
			this.contentLocker();

   }
		// to do come back to this
		contentLocker() {
			let postData = new FormData();
			var aToken = localStorage.getItem('token');
			const endpoint = 'contentlocker'; 
			this.httpClient.get(this.apiURL + endpoint)
			.subscribe((res: ResponseObject) => {
				this.contentLockerItems = res.data["0"];
			this.spinner.hide();

			});
		}
}