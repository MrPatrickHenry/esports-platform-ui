import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
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
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';

// import { Title }     from '@angular/platform-browser';
import { environment } from '../../../environments/environment';


import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
export interface DialogData {
  uid: string;
}

export interface TournamentsResponseObject {
  data: any;
}

export interface ResponseObject {
  data: any;
}

export interface preflightResponseObject {
  data: {
    result:any;
      }
}


export interface tournamentResponseObject {
  data: {
    results: {
      type:any;
    };

  }
}


export interface Types {
  value:string;
  viewValue: string;
}

export interface TimeZone {
  value:string;
  viewValue: string;
}

declare let pid;  

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class AdminTournamentsComponent  implements OnInit {
  displayedColumns: string[] = ['id','name', 'sponsorName', 'launchStartDate', 'launchEndDate','startDate','endDate','rewards','likes'];
  dataSource:any;

  Type: Types[] = [
  {value: '1', viewValue: 'League'},
  {value: '2', viewValue: 'Championship'},
  {value: '3', viewValue: 'Qualifier'},
  {value: '4', viewValue: 'Heat'}
  ];

  TimeZones: TimeZone[] = [
  {value: 'PST', viewValue: 'PST'},
  {value: 'MST', viewValue: 'MST'},
  {value: 'EST', viewValue: 'EST'},
  {value: 'GMT', viewValue: 'GMT'}
  ];

  animal: string;
  uid : string;
  tid: string;

  // private titleService: Title
  constructor(private httpClient: HttpClient,public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router) { }
public apiURL: string = environment.apiUrl;


  ngOnInit() {   
    this.spinner.show();
    this.getArcades();
    this.preflight();
  }



u:any;
  preflight() {
    let aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'users/featureService'; 

    this.httpClient.get('https://20-twenty.online/api/auth/user', {
      headers})
    .subscribe((res: preflightResponseObject) => {
      this.u = res.data.result;  
      if(this.u.userType != 'VALAdmin'){
        this.router.navigate(['/player/profile']); 
      }      
    });
  };



  public mediaSource:any;
  public TournamentsResponseObject:any; 
  public results:any;
  getArcades() {
    // TODO User Angular Service
    //this should be 
    let postData = new FormData();
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/tournaments/list'; 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: TournamentsResponseObject) => {
    this.dataSource = new MatTableDataSource(res.data);
    this.spinner.hide();

    });
  }

  



  
  tID:string;

  AddTournament(): void {
    // pid = uid;
    const dialogRef = this.dialog.open(dialogCreateTournament, {
      height: '100vh',
      panelClass: 'custom-modalbox',

      data: {uid: this.uid}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  CreateTournaments(){

    // pid = uid;
    const dialogRef = this.dialog.open(dialogCreateTournamentsType, {
      height: '100vh',
      width: '70%',          
      panelClass: 'custom-modalbox',

      data: {uid: this.uid}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  editTournament(tID:string) {
    const dialogConfig = new MatDialogConfig();
    let tid = tID;
    // alert(aid);
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100vh';
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = {
      tID: tid
    };
    this.dialog.open(dialogEditTournament, dialogConfig);
  }

  showAttendees(tID:string,userType:string,attendeeType:string) {
    const dialogConfig = new MatDialogConfig();
    let tid = tID;
    let usertype = userType;
    let attendType = attendeeType;
    // alert(aid);
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100vh';
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = {
     tid: tID,
     usertype: userType,
     attendType: attendeeType 
        };
    this.dialog.open(dialogTournamentHosts, dialogConfig);
  }


}

// Create Tournament Types
@Component({
  selector: 'dialogCreateTournamentsType',
  templateUrl: 'dialogCreateTournamentType.html',
})


export class dialogCreateTournamentsType implements OnInit {
  constructor(private router: Router,private _snackBar: MatSnackBar,private httpClient: HttpClient,private spinner: NgxSpinnerService,public dialogRef: MatDialogRef<dialogCreateTournamentsType>) {}
public apiURL: string = environment.apiUrl;


  ngOnInit() {
  }
  users:any;

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

  // TODO fix this 
  createTournamentType(type:string) {
    let postData = new FormData();
    postData.append('type',type);
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    var message = "Profile Updated have a slice 🍕";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/create/tournament/types'; 

    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: ResponseObject) => {
      message = 'Successfully Created: Go have a cuppa! ☕️'
      this.openSnackBar( message);
      this.dialogRef.close();
        this.router.navigate(['/admin/tournaments']); 
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

//Edit Tournament

@Component({
  selector: 'dialogEditTournament',
  templateUrl: 'dialogEditTournament.html',
})
export class dialogEditTournament implements OnInit {

  tournamentIDfromTable:string;

  constructor(private router: Router, private _snackBar: MatSnackBar,
    private httpClient: HttpClient,private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<dialogEditTournament>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.tournamentIDfromTable = data.tID; 

  }

  Type: Types[] = [
  {value: '1', viewValue: 'League'},
  {value: '2', viewValue: 'Championship'},
  {value: '3', viewValue: 'Qualifier'},
  {value: '4', viewValue: 'Heat'}
  ];
public apiURL: string = environment.apiUrl;

  ngOnInit() {
    this.spinner.show();
this.mediaSelect();
    this.tournamentData();

  }


public mediaSource:any;
mediaSelect() {
    var userID = localStorage.getItem('uid');
      let postData = new FormData();
    postData.append('user_ID',userID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/showMedia'; 
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: TournamentsResponseObject) => {
        this.mediaSource = res.data;
            console.log(this.mediaSource);
      });
}

  public tournamentItemData:any;
  tournamentData() {
    let postData = new FormData();
    let tid = this.tournamentIDfromTable;
    postData.append('tid',tid);
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const endpoint = 'admin/tournament/item'; 

    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    //this should be 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: tournamentResponseObject) => {
      this.tournamentItemData = res.data["0"];
      this.spinner.hide();

    });

  }


  public userDetailsPreEdit:any;

  editTournament(
    name:string,
    tt:string,
    group:string,
    lsd:string,
    led:string,
    sd:string,
    ed:string,
    d:string,
    mk:string,
    r:string,
    rq:string,
    b:string,
    p:string,
    v:string,
    notes:string,
    a:string){
    let postData = new FormData();
    postData.append("n", name);
    postData.append("et", tt);
    postData.append("group",group);
    postData.append("id", this.tournamentIDfromTable);
    postData.append("lsd", lsd);
    postData.append("led",led);
    postData.append("sd", sd);
    postData.append("ed", ed);
    postData.append("d", d);
    postData.append("mk",mk);
    postData.append("r", r);
    postData.append("rq", rq);
    postData.append("b", b);
    postData.append("p", p);
    postData.append("v", v);
    postData.append("notes", notes);
    postData.append("a", a);
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    var message = "Profile Updated have a slice 🍕";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/update/tournament'; 

    //this should be 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: ResponseObject) => {
      message = 'Successfully Created: Go have a cuppa! ☕️'
      this.openSnackBar( message);
      this.dialogRef.close();
        this.router.navigate(['/admin/tournaments']); 
    });
  }



  // response to send
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });

  }

   onNoClick(): void {
    this.dialogRef.close();
  }


}



//Create Tournament

@Component({
  selector: 'dialogCreateTournament',
  templateUrl: 'dialogCreateTournaments.html',
})
export class dialogCreateTournament implements OnInit {
  constructor(private router: Router,private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,private httpClient: HttpClient,
    public dialogRef: MatDialogRef<dialogCreateTournament>) {
  }
  Type: Types[] = [
  {value: '1', viewValue: 'League'},
  {value: '2', viewValue: 'Championship'},
  {value: '3', viewValue: 'Qualifier'},
  {value: '4', viewValue: 'Heat'}
  ];

  ngOnInit() {
    this.mediaSelect();
  }
public mediaSource:any;
public apiURL: string = environment.apiUrl;

  createTournament(
  name:string,
    tt:string,
    group:string,
    lsd:string,
    led:string,
    sd:string,
    ed:string,
    d:string,
    summary:string,
    mk:string,
    r:string,
    rq:string,
    key:string,
    password:string,
    room:string,
    b:string,
    icond:string,
    p:string,
    v:string,
    notes:string,
    a:string){
    let postData = new FormData();
    postData.append("n", name);
    postData.append("gtID", "1");
    postData.append("group",group)
    postData.append("lsd", lsd);
    postData.append("led",led);
    postData.append("sd", sd);
    postData.append("ed", ed);
    postData.append("d", d);
    postData.append("summary",summary);
    postData.append("mk",mk);
    postData.append("r", r);
    postData.append("key",key);
    postData.append("password",password);
    postData.append("room",room);
    postData.append("rq", rq);
    postData.append("b", b);
    postData.append("icond", icond);
    postData.append("p", p);
    postData.append("v", v);
    postData.append("notes", notes);
    postData.append("a", a);
    postData.append("et", tt);
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    var message = "Profile Updated have a slice 🍕";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/create/tournament'; 

    //this should be 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: ResponseObject) => {
      message = 'Successfully Created'
      this.openSnackBar( message);
      this.dialogRef.close();
             this.router.navigate(['/admin/tournaments']); 

    });
  }

mediaSelect() {
    var userID = localStorage.getItem('uid');
      let postData = new FormData();
    postData.append('user_ID',userID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/showMedia'; 
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: TournamentsResponseObject) => {
        this.mediaSource = res.data;
            console.log(this.mediaSource);
      });
}

  
  // response to send
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });

  }

   onNoClick(): void {
    this.dialogRef.close();
  }
}




//Tournament Hosts

@Component({
  selector: 'dialogTournamentHosts',
  templateUrl: 'dialogTournamentHosts.html',
})
export class dialogTournamentHosts implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'City', 'Country','gamerTag','home_arcade','status'];
  dataSource:any;

  tournamentIDfromTable:string;
  attendeeType:string;
  userType:string;

  constructor(private _snackBar: MatSnackBar,
    private httpClient: HttpClient,private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<dialogEditTournament>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.tournamentIDfromTable = data.tid; 
    this.attendeeType = data.attendType;
    this.userType = data.usertype;
  }

  ngOnInit() {
    this.spinner.show();
    this.tournamentData();
  }




public apiURL: string = environment.apiUrl;

  public tournamentAttendeesData:any;
  public attendType:any;
  tournamentData() {
    let postData = new FormData();
    let tid = this.tournamentIDfromTable;
    let attendeeType = this.attendeeType;
    let userType = this.userType;
    postData.append('tid',tid);
    postData.append('attendeeType',attendeeType);
    postData.append('userType',userType);
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/tournament/attending'; 

    //this should be 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: ResponseObject) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.attendType = attendeeType;
      this.spinner.hide();

    });
  }

// attend/host
onChange(aid,e) {
var state = "0"
        if (e.checked != true) {
          state = "0";
        }
        else {
          state = "1";
        }
let postData = new FormData();
    postData.append('id',aid);
    postData.append('status',state);
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/tournament/attend/host'; 
    //this should be 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: ResponseObject) => {
      // this.dataSource = new MatTableDataSource(res.data);
    });
} 

     onNoClick(): void {
        this.dialogRef.close();
      }
}

