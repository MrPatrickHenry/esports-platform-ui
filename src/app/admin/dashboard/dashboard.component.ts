import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {trigger, transition, animate, style } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';

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
import { Title }     from '@angular/platform-browser';


export interface DialogData {
  uid: string;
}

export interface UsersResponseObject{
  data:{
    result:{}
  }
}

export interface ResponseObject {
  data: {
    results: { 
      GenderBreakDown:any;
      countryBreakDown:any;
      TopPlayers:any;
      }
             HotPlayer:any;
        tracking:{}; 

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

declare let pid;  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['gamertag', 'High_Score'];
  dataSource:any;

  uid : string;
  pid: string;
public apiURL: string = environment.apiUrl;

public hotPlayer:any;
public tracking:any;
public GenderAnalyitics:any;
public countrysData:any;
public analyticalSummary:any;

  constructor(private titleService: Title,private httpClient: HttpClient,
    public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router)
   { }

  ngOnInit() {
    this.preflight();
    this.spinner.show();
    this.getAnalytics();
          this.spinner.hide();

  }


  u:any;
  preflight() {
    let aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);

    this.httpClient.get('https://20-twenty.online/api/auth/user', {
      headers})
    .subscribe((res: UsersResponseObject) => {
      this.u = res.data.result;  
      if(this.u.userType != 'VALAdmin'){
        this.router.navigate(['/tournaments']); 
      }      
    });
  };

    getAnalytics(){
    let postData = new FormData();
    var aToken = localStorage.getItem('token');
    postData.append('token',aToken);
    // TODO User Angular Service
    const endpoint = 'admin/analytics'; 

    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe((res: ResponseObject) => {
      this.analyticalSummary = res.data.results;
      this.GenderAnalyitics = res.data.results.GenderBreakDown
      this.countrysData = res.data.results.countryBreakDown;
      this.dataSource = new MatTableDataSource(res.data.results.TopPlayers);
      this.tracking = res.data.tracking;
      this.hotPlayer = res.data.HotPlayer["0"];

    });
 } 
}
