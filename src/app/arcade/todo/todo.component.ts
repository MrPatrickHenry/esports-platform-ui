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

export interface Category {
  value: string;
  viewValue: string;
}

export interface Priority {
  value: string;
  viewValue: string;
}

export interface status {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public tasks:any;
  public apiURL: string = environment.apiUrl;
  public tournament:any;
  public eventPreperation:any;
  public socialGrowth:any;
  public rulesRecord:any;
  public postTournament:any;
  public userServices:any;
  public shortTag: any;
  public tID:any;
  public tournID:any;
  public results:any;
  statusView:any;
  shortTagRequest:any;

  constructor(private _snackBar: MatSnackBar,private titleService: Title,
    private httpClient: HttpClient,public dialog: MatDialog,
    private spinner: NgxSpinnerService,private router: Router,private route: ActivatedRoute,private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
          this.spinner.show();

    this.featureServiceRequest();
    this.activatedRoute.url.subscribe(url =>{this.getTournament();});
  }
 
  featureServiceRequest() {
        var aToken = localStorage.getItem('token');
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('id', uid);
        const endpoint = 'user/featureService'; 
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.apiURL + endpoint,postData, {headers})
        .subscribe((res: ResponseObject) => {
          let userServices = res.data.result["0"];
        });
      }
// to do come back to this
  getTournament() {
        this.shortTag = this.route.snapshot.paramMap.get("shorttag")
        let postData = new FormData();
        const endpoint = 'tournament/show'; 
        postData.append('shortTag', this.shortTag);
        this.httpClient.post(this.apiURL + endpoint,postData)
        .subscribe((res: ResponseObject) => {
          this.tournament = res.data["0"].id;
              this.tournamentTasks(this.tournament);  

        });
      }

      tournamentTasks(tid): void{
        let postData = new FormData();
        var uid = localStorage.getItem('uid');
        postData.append("tournament_ID", tid);
        postData.append("priority", "%");
        postData.append("categoryType", "%");
        postData.append("completed", "%");
        postData.append("userID", uid);
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'arcade/todoShow'; 
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe((res: ResponseObject) => {
          this.eventPreperation = res.data.eventPreperation["0"];
          this.socialGrowth = res.data.socialGrowth["0"];
          this.rulesRecord = res.data.rulesRecord["0"];
          this.postTournament = res.data.postTournament["0"];
                this.spinner.hide();

        });
      }

      dialogCreateTask(): void {
        console.log(this.tournament);
        const dialogRef = this.dialog.open(dialogCreateTask, {
          height: '100vh',
          width: '70%',
          panelClass: 'custom-modalbox',
          data: {id: this.tournament.TournamentID}
          });
      }


      done(id,e) {
        var state = 0
        if (e.checked != true) {
          state = 0;
        }
        else {
          state = 1;
        }
        let taskID = id;
        let AuthUser = localStorage.getItem('user');
        let stateCompleted = state.toString();
        let postData = new FormData();
        postData.append('is_completed', stateCompleted);
        postData.append('id',taskID);
        // to do User Angular Service
        var aToken = localStorage.getItem('token');
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'arcade/todo/iscompleted'; 
        this.httpClient.post(this.apiURL + endpoint, postData, { headers })
        .subscribe((res: ResponseObject) => {
          let message = 'Updated Tasks: 🚨 Keep destorying it! 🚨'
          this.openSnackBar(message);
        });
      }

      // response to send
      openSnackBar(message: string) {
        this._snackBar.open(message, '', {
          duration: 3000
        });
      }

    }


    // Create TASK 
    @Component({
      selector: 'dialogCreateTask',
      templateUrl: 'dialogCreateTask.html'
    })
    export class dialogCreateTask implements OnInit {
      tournamentIDfromTable:string;
      constructor(private router: Router,
        private route: ActivatedRoute,private activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private httpClient: HttpClient,private spinner: NgxSpinnerService,
        public dialogRef: MatDialogRef<dialogCreateTask>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        let tournamentIDfromTable = data.id; 
      }

      categories: Category[] = [
      {value: 'Marketing', viewValue: 'Marketing'},
      {value: 'Prep', viewValue: 'Pre-Tournament'},
      {value: 'Post', viewValue: 'Post-Tournament'},
      {value: 'Document', viewValue: 'Document'},

      ];

      priorities: Priority[] = [
      {value: 'Low', viewValue: 'Low'},
      {value: 'Medium', viewValue: 'Medium'},
      {value: 'High', viewValue: 'High'}
      ];

      ngOnInit() {
      }
      public tournament:string;
      public tID:any;
      public results:any;
      statusView:any;
      shortTagRequest:any;
      public apiURL: string = environment.apiUrl;
      users:any;

      // TODO fix this 
      createArcade(
        name: string,
        priority:string,
        category:string,
        desc:string) {
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append("user_ID", uid);
        postData.append("title", name);
        postData.append("tournament_id", this.data.id);
        postData.append("desc", desc);
        postData.append("category", category);

        // TODO User Angular Service
        var aToken = localStorage.getItem('token');
        var message = "NEW TASK ADDED: GO GET IT 🐯";
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'arcade/todo/user/create'; 
        //this should be 
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe( (res: ResponseObject) => {
          this.openSnackBar( message);
          this.dialogRef.close();
          location.reload();
        });
      }

            openSnackBar(message: string) {
        this._snackBar.open(message, '', {
          duration: 3000
        });
      }

      // @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

      onNoClick(): void {
        this.dialogRef.close();
      }
    }