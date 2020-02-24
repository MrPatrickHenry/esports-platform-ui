import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { trigger, transition, animate, style } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import {
HttpClient,
HttpParams,
HttpErrorResponse,
HttpResponse,
HttpHeaders
} from '@angular/common/http';
import {
Router,ActivatedRoute
} from '@angular/router';
import {
MatSnackBar
} from '@angular/material/snack-bar';
import { Title }     from '@angular/platform-browser';
import { environment } from '../../environments/environment';

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

declare let pid;  
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
displayedColumns: string[] = ['profilePic','name', 'gamertag', 'City','Country','status','updated_at'];
dataSource:any;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

uid : string;
pid:  string;

constructor(private _snackBar: MatSnackBar,private titleService: Title,private httpClient: HttpClient,public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router,private route: ActivatedRoute,private activatedRoute: ActivatedRoute) { }

ngOnInit() {

    this.setTitle();
     this.preflight();
    // this.getUsers();  
    this.activatedRoute.url.subscribe(url =>{this.getRoster();});

}

u:any;
param1: string;
teamManager:any;
public apiURL: string = environment.apiUrl;
public teamID: any;

//To do change to new auth profile account
preflight() {
  var aToken = localStorage.getItem('token');
  var uid = localStorage.getItem('uid');
    let postData = new FormData();
    postData.append('id', uid);

    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
const endpoint = 'user/featureService'; 

    this.httpClient.post(this.apiURL + endpoint,postData, {headers})
    .subscribe((res: ResponseObject) => {
        this.u = res.data["0"].result["0"];  
        this.teamID = res.data["0"].result["0"].team;  
        this.teamManager = res.data["0"].result["0"].teamManager;  
        this.getRoster();
        // if(!this.teamManager){
        //   this.router.navigate(['/tournaments']);
        // }
    });
};

// move to a service TODO
public setTitle() {
    this.titleService.setTitle( 'Team - Management' );
}
public users:any; 
public results:any;
statusView:any;
status:any;
getRoster() {

    var uid = localStorage.getItem('uid');
    let postData = new FormData();
    let id = this.route.snapshot.params.status;
    if (id === 'Approved'){
        this.statusView = 1;
    }
    if (id === 'Denied'){
        this.statusView = 0;
    }    
    if (id === 'Pending'){
        this.statusView = 2;
    }
    postData.append('status', this.statusView);
    postData.append('id', '17');
    var aToken = localStorage.getItem('token');
const endpoint = 'teams/roster/list'; 

    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: UsersResponseObject) => {
        this.dataSource = new MatTableDataSource(res.data);

    });
}

updateRoster(id:string,e){
                let ids = id;
                var state = 0
                if(e.checked != true){
                    state = 0;
                }
                else{
                    state = 1;
                } 
                let AuthUser = localStorage.getItem('user');            
                let statusUpdate = state.toString();
                let postData = new FormData();
                postData.append('id', ids);
                postData.append('status', statusUpdate);
                // to do User Angular Service
                var aToken = localStorage.getItem('token');
                const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                const endpoint = 'teams/roster/update'; 

                this.httpClient.post(this.apiURL + endpoint,postData,{headers})
                .subscribe( (res: ResponseObject) => {
                    let message = 'Team roster has been updated: 🦾'
                    this.openSnackBar( message);
                    this.getRoster();
                });
            }


                        // response to send
                        openSnackBar(message: string) {
                                this._snackBar.open(message, '', {
                                        duration: 3000
                                });
                        }

                        timer(){
                                setTimeout(function(){ location.reload(); }, 3000);
                        }

applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

}