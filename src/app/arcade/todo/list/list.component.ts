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
	import { environment } from '../../../../environments/environment';

	export interface DialogData {
		uid: string;
	}

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
		selector: 'app-list',
		templateUrl: './list.component.html',
		styleUrls: ['./list.component.scss']
	})
	export class ListComponent implements OnInit {
		public apiURL: string = environment.apiUrl;
		public todoGroups:any;
		public userServices:any;

		constructor(private _snackBar: MatSnackBar,
			private httpClient: HttpClient,public dialog: MatDialog,
			private spinner: NgxSpinnerService,private router: Router) {}


		ngOnInit() {
			this.spinner.show();
			this.featureServiceRequest();
		}

		featureServiceRequest() {
			var aToken = localStorage.getItem('token');
			var uid = localStorage.getItem('uid');
			let postData = new FormData();
			postData.append('id', uid);
			const endpoint = 'user/featureService'; 
			const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
			this.httpClient.post(this.apiURL + endpoint,postData,{headers})
			.subscribe((res: ResponseObject) => {
			this.userServices = res.data.result["0"];
				this.toDoTournaments(this.userServices.id);  
			});
		}

		// to do come back to this
		toDoTournaments(id) {
			let postData = new FormData();
			var aToken = localStorage.getItem('token');
			const endpoint = 'arcade/tournament/todo/list'; 
			postData.append('user_ID',id);
			const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
			this.httpClient.post(this.apiURL + endpoint, postData,{headers})
			.subscribe((res: ResponseObject) => {
				this.todoGroups = res.data["0"];
				console.log(this.todoGroups);
			this.spinner.hide();

			});
		}

	}
