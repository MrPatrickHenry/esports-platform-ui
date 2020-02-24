import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {trigger, transition, animate, style } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
import { Title }     from '@angular/platform-browser';

import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
	HttpResponse,
	HttpHeaders
} from '@angular/common/http';
import {
	Router
} from '@angular/router';
import {
	MatSnackBar
} from '@angular/material/snack-bar';

export interface DialogData {
	uid: string;
}


export interface UsersResponseObject {
	data: any;
}


export interface UserResponseObject {

	results: {};

}

export interface ResponseObject {
	data: {
		result: {
		};

	}
}


export interface Types {
	value:string;
	viewValue: string;
}

export interface PeriodicElement {
	name: string;
	email: string;
	profilePic: number;
	gender: string;
}


export interface users{
	dataUsersReturn: any;
}




@Component({
	selector: 'app-admin-titles',
	templateUrl: './titles.component.html',
	styleUrls: ['./titles.component.scss']
})
export class AdminTitlesComponent implements OnInit {
	displayedColumns: string[] = ['developer','name','player_Count', 'game_Type','shortTag','active'];
	dataSource:any;
	public apiURL: string = environment.apiUrl;
	public users:any; 
	public results:any;
	public u:any;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	uid : string;
	pid:  string;

	constructor(private titleService: Title,private httpClient: HttpClient,public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router,) { }

	ngOnInit() {
		this.preflight();
		this.setTitle();
		this.getGameTitles();
		// this.dataSource;
	}

	preflight() {
		let aToken = localStorage.getItem('token');
		const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
		this.httpClient.get('https://20-twenty.online/api/auth/user', {
			headers})
		.subscribe((res: ResponseObject) => {
			this.u = res.data.result;  
			if(this.u.userType != 'VALAdmin'){
				this.router.navigate(['/player/profile']); 
			}      
		});
	};
	public setTitle() {
		this.titleService.setTitle( 'Admin - Users' );
	}

	getGameTitles() {
		let postData = new FormData();
		// TODO User Angular Service
		var aToken = localStorage.getItem('token');
		const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
		const endpoint = 'titles'; 

		this.httpClient.get(this.apiURL + endpoint,{headers})
		.subscribe( (res: UsersResponseObject) => {
			this.dataSource = new MatTableDataSource(res.data);

		});
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	openDialog(uIDEdit:string) {
		const dialogConfig = new MatDialogConfig();
		let uid = uIDEdit;
		// alert(aid);
		dialogConfig.autoFocus = true;
		dialogConfig.height = '100vh';
		dialogConfig.width = '70%';
		dialogConfig.panelClass = 'custom-modalbox';
		dialogConfig.data = {
			uid: uid
		};

		// this.dialog.open(dialogEditTitle, dialogConfig);
	}


}