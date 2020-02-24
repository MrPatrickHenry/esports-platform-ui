import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { trigger, transition, animate, style } from '@angular/animations';
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
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';



export interface PeriodicElement {
  name: string;
  position: number;
  Address: string;
  LeagueCert: string;
}

export interface DialogData {
  uid: string;
}

export interface Lincenses{
  value:string;
  viewValue:string;
}

export interface ResponseObject {
  data: any;
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
  selector: 'app-arcades',
  templateUrl: './arcades.component.html',
  styleUrls: ['./arcades.component.scss']
})


export class AdminArcadesComponent implements OnInit {
public apiURL: string = environment.apiUrl;


  displayedColumns: string[] = ['arcadeName', 'phone','email', 'city','country','website'];
  dataSource:any;
  title = "Admin - Arcade Management";
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  TimeZones: TimeZone[] = [
  {value: 'PST', viewValue: 'PST'},
  {value: 'MST', viewValue: 'MST'},
  {value: 'EST', viewValue: 'EST'},
  {value: 'GMT', viewValue: 'GMT'}
  ];

  animal: string;
  uid : string;
  aid : string;
  pid: string;
  results:any;

  constructor(private titleService: Title,private httpClient: HttpClient,
    public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router,) { 

  }

  openDialog(aIDEdit:string) {
    const dialogConfig = new MatDialogConfig();
    let aid = aIDEdit;
    // alert(aid);
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100vh';
    dialogConfig.width = '70%';
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = {
      aid: aid
    };
    this.dialog.open(dialogEditArcade, dialogConfig);
  }


  dialogCreateArcade(){
    const dialogRef = this.dialog.open(dialogCreateArcade, {
      height: '100vh',
      width: '70%',          
      panelClass: 'custom-modalbox',
      data: {uid: this.uid}

    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getArcades();
    // this.dataSource.paginator = this.paginator;
    this.setTitle();
    this.preflight();
  }

preflight() {
    let auth = localStorage.getItem('auth');
    let player = localStorage.getItem('userType')
    if (auth != 'true' || player !='VALAdmin') {
      this.router.navigate(['/signin']);
    }

  }


  // move to a service TODO
  public setTitle() {
    this.titleService.setTitle( 'Admin - Arcades' );
  }

  public users  = []; 

  getArcades() {
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const endpoint = 'admin/arcade'; 
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    this.httpClient.get(this.apiURL + endpoint,{headers})
    .subscribe( (res: ResponseObject) => {
    this.dataSource = new MatTableDataSource(res.data);
    this.spinner.hide();
    });
  }

          applyFilter(filterValue: string) {
                this.dataSource.filter = filterValue.trim().toLowerCase();
        }


}


@Component({
  selector: 'dialogEditArcade',
  templateUrl: 'dialogEditArcade.html',
})

export class dialogEditArcade implements OnInit {

Liceenses: Lincenses[] = [
          {value: 'PLVR', viewValue: 'PLVR'},
          {value: 'Springboard', viewValue: 'Springboard'},
          {value: 'Ctrl V', viewValue: 'Ctrl V'},
          {value: 'Synthesis', viewValue:'Synthesis'},
          {value: 'Steam Cafe', viewValue:'Steam Cafe'},
          {value: 'Viveport', viewValue:'Viveport'},
          {value: 'Neurogaming', viewValue:'Neurogaming'},
          {value: 'MK2', viewValue:'MK2'},
          {value: 'direct deals', viewValue:'direct deals'},
          {value: 'other', viewValue:'Other'}
          ];

  paid:string
  users:any;
  aidPost:string;
  DataIDfrinTable:string;
  constructor(private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<dialogEditArcade>
    ) 
  { 

    this.DataIDfrinTable = data.aid; 
  }

  ngOnInit() {
    this.ArcadeDetailsPreEdit();
  }
public apiURL: string = environment.apiUrl;

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

  arcade:any;
  ArcadeDetailsPreEdit() {
    let postData = new FormData();
    let aidPost = this.DataIDfrinTable;
    postData.append('aid',aidPost);
    // TODO User Angular Service
    const endpoint = 'admin/arcade/item'; 
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    //this should be 
    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: ResponseObject) => {
      this.arcade = res.data.result;
    });
  }

  // TODO fix this 
  arcadeUpdate(aid:string,name: string, email: string,phone:string,Address1:string,zipPost:string,website:string,desc:string,licensing:string,notes:string,active:string,youtube:string,telegram:string,snapchat:string,twitter:string,discord:string) {
    let postData = new FormData();
    postData.append('aid',aid);
    postData.append('name',name);
    postData.append('email',email);
    postData.append('phone',phone);
    postData.append('zipPost',zipPost);
    postData.append('Address1',Address1);
    postData.append('zipPost',zipPost);
    postData.append('website',website);
    postData.append('desc',desc);
    postData.append('licensing',licensing);
    postData.append('notes',notes);
    postData.append('active',active);
    postData.append('youtube',youtube);
    postData.append('telegram',telegram);
    postData.append('snapchat',snapchat);
    postData.append('twitter',twitter);
    postData.append('discord',discord);

    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    var message = "Profile Updated have a slice 🍕";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    //this should be 
    const endpoint = 'admin/arcade/update'; 
    this.httpClient.post(this.apiURL + endpoint,postData)
    .subscribe( (res: ResponseObject) => {
      message = 'Updated Arcade Profile : Have a slice 🍕'
      this.openSnackBar( message);
      this.timer();
      this.dialogRef.close();
    });
  }

  timer(){
    setTimeout(function(){ location.reload(); }, 3000);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


// Create Arcade 
@Component({
  selector: 'dialogCreateArcade',
  templateUrl: 'dialogCreateArcade.html'
})
export class dialogCreateArcade implements OnInit {
  constructor(private _snackBar: MatSnackBar,private httpClient: HttpClient,public dialogRef: MatDialogRef<dialogCreateArcade>) {}


  ngOnInit() {
  }
public apiURL: string = environment.apiUrl;

  users:any;

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

  // TODO fix this 
  createArcade(
    name: string,
    email: string,
    phone:string,
    zipPost:string,
    Address1:string,
    Address2:string,
    city:string,
    state:string,
    country:string,
    website: string,
    logo: string,
    desc: string,
    notes:string,
    active: string,
    youtube:string,
    telegram:string,
    snapchat:string,
    twitter:string,
    discord:string) {
    var uid = localStorage.getItem('uid');

    let postData = new FormData();
    postData.append('uid',uid);
    postData.append('name',name);
    postData.append('email',email);
    postData.append('phone',phone);
    postData.append('zipPost',zipPost);
    postData.append('Address1',Address1);
    postData.append('Address2',Address2);
    postData.append('city',city),
    postData.append('state', state);
    postData.append('country',country);
    postData.append('website',website);
    postData.append('logo',logo);
    postData.append('desc',desc);
    postData.append('notes',notes);
    postData.append('active',active);
    postData.append('youtube',youtube);
    postData.append('snapchat',snapchat);
    postData.append('twitter',twitter);
    postData.append('discord',discord);

    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    var message = "Profile Updated have a slice 🍕";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/arcade'; 

    //this should be 
    this.httpClient.post(this.apiURL + endpoint,{headers,postData})
    .subscribe( (res: ResponseObject) => {
      message = 'Created an Arcade, go grab some sushi 🍣'
      this.openSnackBar( message);
      this.dialogRef.close();
      location.reload();
    });
  }

  // @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



