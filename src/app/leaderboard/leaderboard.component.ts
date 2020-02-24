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
    HttpHeaders
} from '@angular/common/http';
import {
    Router
} from '@angular/router';
import {
    MatSnackBar
} from '@angular/material/snack-bar';
import { Title }     from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../environments/environment';

export interface DialogData {
    uid: string;
}


export interface UsersResponseObject {
    data:any;
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

declare let pid;

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
    displayedColumns: string[] = ['id','gamertag', 'country','High_Score'];
    dataSource:any;
  publicIpAddr: string;
  public apiURL: string = environment.apiUrl;

propsToShow = ['userAgent', 'os', 'browser', 'device', 'os_version', 'browser_version'];
  deviceInfo = null;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    uid : string;
    pid:  string;

    constructor(private titleService: Title,private httpClient: HttpClient,public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router) 
    {         

}

public ipRssult:any;
    ngOnInit() {

        this.setTitle();
        this.scores();
    }


// to fix
// deviceFunction() {
//        this.deviceInfo = this.deviceService.getDeviceInfo();
// }



    public setTitle() {
        this.titleService.setTitle( 'Leaderboard' );
    }

    public users:any; 
    public results:any;

    scores() {
        let postData = new FormData();
        // TODO User Angular Service
        var aToken = localStorage.getItem('token');
        postData.append('tournamentID','22');
        const endpoint = 'lboard'; 
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe( (res: UsersResponseObject) => {
            this.dataSource = new MatTableDataSource(res.data);

        });
    }


    tracking(filesID:string,impression,click){
        let postData = new FormData();
        // TODO User Angular Service
        var aToken = localStorage.getItem('token');
        var uid = localStorage.getItem('uid');
        let fid = filesID; 
        var browser = navigator.appName;
        var version = navigator.appVersion;
        postData.append('files_id',fid);
        postData.append('user_id',uid);
        postData.append('impression',impression);
        postData.append('click',click);

        postData.append('userDevice','MacOS Desktop');
        postData.append('ipaddress','comingSoon');
        const endpoint = '/tracking/ad'; 

        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe( (res: UsersResponseObject) => {
return true;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    // end of component Leaderboard        
}
