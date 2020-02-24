import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { trigger, transition, animate, style } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient,HttpParams,HttpErrorResponse,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title }     from '@angular/platform-browser';
import { MatBadgeModule } from '@angular/material/badge';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

// tournament models
export interface ResponseObject {
    data: {
        recordCount:{};
        arcade:{};
        results: {
            path:{};
        };
    }
}

export interface ResponseAttendingObject {
    data:{
        counts:{};
        tournaments:{};
        results:{};
        recordCount:{};
    }
}

export interface ResponseUserObject {
    data: {
        arcade:{
            id:any;
        };
        result: {
            userType:{};
        };

    }
}
declare var AuthUser:any; 



@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

    // vars needed for re-reviewing
    public tournaments = {};
    public id = {};
    public attendingTournament = {};
    public recordCountAttending = {};
    public recordCountTournaments = {};
    public AuthUser:string;
    public users:any;
    public arcadeData = {};
    public tournamentImage:any;
    public apiURL: string = environment.apiUrl;
    public attendedTournament:any;
    recordCountAttended:any;
    trustedUrl: SafeUrl;

    constructor(private spinner: NgxSpinnerService,private sanitizer: DomSanitizer,private titleService: Title,private httpClient: HttpClient,private router: Router,private _snackBar: MatSnackBar,public dialog: MatDialog ) {}

    ngOnInit() {
        var AuthUser = localStorage.getItem('user');  
        this.setTitle();
        let auth = localStorage.getItem('auth');
        if (auth === null || 'guest'){
            this.publicEvents();

        }if(auth === 'true'){
            this.events();   
            this.eventsAttending();
            this.userDetails();
          this.eventsAttended();
        }


    }

    public setTitle() {
        this.titleService.setTitle( 'Season 4 - Tournaments' );
    }


    userDetails() {
        var AuthUser = localStorage.getItem('user');            
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('id',uid);
        // TODO User Angular Service
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'user/profile'; 
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe( (res: ResponseUserObject) => {
            this.users = res.data.result["0"];
            this.arcadeData = res.data.arcade.id;
        });
    }

    publicEvents() {
        let postData = new FormData();
        var aToken = localStorage.getItem('token');
        const endpoint = 'tournament/list'; 
        //this should be 
        this.httpClient.get(this.apiURL + endpoint)
        .subscribe((res: ResponseObject) => {
            this.tournaments = res.data.results;
            this.recordCountTournaments = res.data.recordCount;
            console.log(this.recordCountTournaments);
        },           error => {
            console.log("Error", error);
            var e = error.statusText;
            var message = 'Sorry something went wrong: ';
        });
    }



    events() {
          var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('UID',uid);
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'user/tournaments'; 
        //this should be 
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe((res: ResponseObject) => {
            this.tournaments = res.data["0"].results;
            this.recordCountTournaments = res.data.recordCount;
            this.tournamentImage = res.data.results.path;
        });
    }

    eventsAttending(){
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('uid',uid);
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'tournaments/attending'; 
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe((res: ResponseAttendingObject) => {
            this.attendingTournament = res.data.results;
            this.recordCountAttending = res.data.recordCount;
            console.log(this.recordCountAttending);

        });

    }

    eventsAttended(){
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('UID',uid);
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'tournaments/attended'; 
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe((res: ResponseAttendingObject) => {
            this.attendedTournament = res.data.tournaments["0"];
            this.recordCountAttended = res.data.counts["0"];

        });
    }

    likes(tid:string){
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('uid',uid);
        postData.append('tid',tid);
        postData.append('teamID','1');
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'tournament/like'; 

        this.httpClient.post(this.apiURL + endpoint, postData,{headers})
        .subscribe(
            data => {
                if(uid){
                    this.events();
                }else
                {this.publicEvents();}

            },
            error => {
                console.log("Error", error);
                var e = error.statusText;
                var message = 'Sorry something went wrong: ';
            }
            );

    }

    join(tid:string){
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('uid',uid);
        postData.append('tid',tid);
        postData.append('teamID','1');
        var aToken = localStorage.getItem('token');
        const endpoint = 'tournaments/attend'; 

        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.apiURL + endpoint, postData,{headers}).subscribe(
            data => {
                // @ts-ignore
                var message = 'Welcome to the THUNDERDOME!!! 🎮 ☠️';  
                this.openSnackBar(message);
                this.events();
                this.eventsAttending();
            },
            error => {
                var e = error.statusText;
                var message = 'Sorry something went wrong: ';
            }
            );
    }

        // response to send
        openSnackBar(message: string) {
            this._snackBar.open(message, '', {
                duration: 3000
            });


        }

    }

    