import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { trigger, transition, animate, style } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient,HttpParams,HttpErrorResponse,HttpResponse,HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title }     from '@angular/platform-browser';
import { MatBadgeModule } from '@angular/material/badge';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {
    Router,ActivatedRoute
} from '@angular/router';

import { environment } from '../../../environments/environment';



// tournament models
export interface ResponseObject {
    data: {
        result: {};
    }
}

export interface ArcadeResponseObject{
    data:any;
}

export interface TournamentResponseObject{
    data:{};
}
export interface ResponseAttendingObject {
    data:{
        results:{};
    }
}

export interface ResponseUserObject {
    data: {
        result: {
            userType:any;
        };

    }
}
declare var AuthUser:any; 


@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    // vars needed
    public tournament: any;
    public shortTag: any;
    public attendingTournament = {};
    public recordCountAttending = {};
    public recordCountTournaments = {};
    public AuthUser:string;
    public usertype:any;
    public users:any;
    public arcadeData = {};
    public tournamentImage:any;
    public uid:any;
    public hostInfo:any;
    public apiURL: string = environment.apiUrl;
    public auth:any;
    public results:any;
    public tid:any;
    public arcademapData:any;
    public google:any;
    public todayDate:any;
    public attending:any;
    playersAttending:any;
    active:any;
    constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,
        private titleService: Title,private httpClient: HttpClient,private router: Router,private _snackBar: MatSnackBar,public dialog: MatDialog ) {}
    displayedColumns: string[] = ['name', 'city','country'];

    dataSource:any;

    ngOnInit() {
        this.todayDate = new Date();
        this.spinner.show();
        this.activatedRoute.url.subscribe(url =>{this.getTournament();});
        this.spinner.hide();
                this.userDetails();

        let auth = localStorage.getItem('auth');
        if (auth === null)
        {
            localStorage.setItem('auth', 'guest');
            var usertype = 'guest';
        }
        if (auth === 'true'){
            this.featureServiceRequest();
        }
    }

    featureServiceRequest() {
        var aToken = localStorage.getItem('token');
        var uid = localStorage.getItem('uid');
        if(!uid){
            return false;
        }
        let postData = new FormData();
        postData.append('id', uid);
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        const endpoint = 'user/featureService'; 
        this.httpClient.post(this.apiURL + endpoint,postData, {headers})
        .subscribe((res: ResponseObject) => {
            this.usertype = res.data.result["0"].userType;
            console.log(this.usertype);
        });
    }

    statusView:any;
    shortTagRequest:any;
    getTournament() {
        this.shortTag = this.route.snapshot.paramMap.get("shorttag")
        let postData = new FormData();
        const endpoint = 'tournament/show'; 
        var uid = localStorage.getItem('uid');
        postData.append('shortTag', this.shortTag);
        postData.append('UID',uid);
        this.httpClient.post(this.apiURL + endpoint,postData)
        .subscribe((res: TournamentResponseObject) => {
            this.tournament = res.data["0"];
            this.tid = res.data["0"].id;
            this.getArcades(this.tid);
            this.getPlayers(this.tid);
            this.attending = res.data["0"].attending;
            this.active = res.data["0"].Active;
        });
    }

// move to feature serveice to do
userDetails() {
        var AuthUser = localStorage.getItem('user');            
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('id',uid);
        // TODO User Angular Service
        var aToken = localStorage.getItem('token');
        const endpoint =  'user/profile'
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
        .subscribe( (res: ResponseUserObject) => {
                this.arcadeData = res.data["0"].arcade["0"].id;
        });
}






    join(id){
        var uid = localStorage.getItem('uid');
        var usertype = localStorage.getItem('userType');

        let postData = new FormData();
        postData.append('playerID',uid);
        postData.append('tournamentID',id);
        postData.append('teamsID','1');
        postData.append('userType',usertype);
        var aToken = localStorage.getItem('token');
        const endpoint = 'tournaments/attend'; 

        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.apiURL + endpoint, postData,{headers}).subscribe(
            data => {
                // @ts-ignore
                var message = 'Welcome to the THUNDERDOME!!! 🎮 ☠️';  
                this.openSnackBar(message);
                    this.router.navigate(['/tournaments']);

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

    addscore(id) {
                const dialogConfig = new MatDialogConfig();
                var uid = localStorage.getItem('uid');
                let tid = id;
                // alert(aid);
                dialogConfig.autoFocus = true;
                dialogConfig.height = '100vh';
                dialogConfig.width = '40%';
                dialogConfig.panelClass = 'custom-modalbox';
                dialogConfig.data = {
                            tid: tid,
                            uid: uid,
                            hid: this.arcadeData
                    };
                    this.dialog.open(ScoreSubmissionComponent, dialogConfig);
            }

                    getArcades(tid) {
                        // TODO User Angular Service
                        var aToken = localStorage.getItem('token');
                        const endpoint = 'host/map'; 
                        var ut = localStorage.getItem('userType');
                        let postData = new FormData();
                        postData.append('tid',tid);
                        postData.append('ut',ut);
                        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
                        .subscribe( (res: ArcadeResponseObject) => {
                            this.dataSource = new MatTableDataSource(res.data);
                            this.spinner.hide();
                        });
                    }


                    getPlayers(tid) {
                        // TODO User Angular Service
                        var aToken = localStorage.getItem('token');
                        const endpoint = 'tournaments/competitors'; 
                        var ut = localStorage.getItem('userType');
                        let postData = new FormData();
                        postData.append('tid',tid);
                        postData.append('ut','Player');
                        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
                        .subscribe( (res: ArcadeResponseObject) => {
                            this.playersAttending = res.data;
                            this.spinner.hide();
                        });
                    }

                    applyFilter(filterValue: string) {
                        this.dataSource.filter = filterValue.trim().toLowerCase();
                    }



                }
//ScoreSubmission
@Component({
    selector: 'ScoreSubmissionComponent',
    templateUrl: '../models/score-submission/score-submission.component.html',
})
export class ScoreSubmissionComponent implements OnInit {

    form: FormGroup;
    tournamentIDfromTable:string;
    userID:string;
    hid:string;
    constructor(public fb: FormBuilder,private formBuilder: FormBuilder,private _snackBar: MatSnackBar,
        private httpClient: HttpClient,private spinner: NgxSpinnerService,
        public dialogRef: MatDialogRef<ScoreSubmissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.tournamentIDfromTable = data.tid; 
        this.userID = data.uid;
        this.hid = data.hid;
        this.form = this.fb.group({
            name: [''],
            opponenet:[''],
            winner:[''],
            comments:[''],
            homePlayer:[''],
            avatar: [null]
        })
    }

    SERVER_URL = "https://20-twenty.online/api/v2/tournaments/score";
    signup: FormGroup;  
    fileData: File = null;
    ngOnInit() {
        this.competitorsList();
    }
    filesToUpload: Array<File> = [];


    // retrieve all users competing
    api = "https://20-twenty.online/api/v2/tournaments/competitors";

    public competitors:any;
    competitorsList(){
        const formData: any = new FormData();
        formData.append('tid',this.tournamentIDfromTable);
        formData.append('userType','Player');
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.api,formData,{headers})
        .subscribe( (res: ResponseObject) => {
            this.competitors = res.data["0"].results;
        });
    }

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        console.log(files);

        for(let i =0; i < files.length; i++){
            formData.append("Match"+[i], files[i], files[i]['name']);
        }

        let tid ='22';
        let submitedBy = '2';
        let winner = '2';
        let commments ='testing';
        let matchScore0 ='1';
        let matchScore1 ='2';
        let matchScore2 ='3';
        let opponenet = '2';
        let round = 'Finals';
        let homeArcade ='2578';
        let homePlayer = '2';
        let referee = '2';
        // let userType = this.userType;
        formData.append('tID',this.tournamentIDfromTable);
        formData.append('userID',this.userID);
        formData.append('title','TT Score 2019');
        formData.append('submitedBy',this.userID);
        formData.append('winner',winner);
        formData.append('comments',commments);
        formData.append('opponenet',opponenet);
        formData.append('round',round);
        formData.append('homeArcade',this.hid);
        formData.append('matchScore0',matchScore0);
        formData.append('matchScore2',matchScore1);
        formData.append('matchScore3',matchScore2);
        formData.append('homePlayer',homePlayer);
        formData.append('ref', referee);
        console.log('form data variable :   '+ formData.toString());
            var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.httpClient.post(this.SERVER_URL,formData,{headers})
        .subscribe(files => console.log('files', files))
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
}