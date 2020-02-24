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
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
        displayedColumns: string[] = ['menu','name', 'gamertag','phone','email', 'City','Country','userType'];
        dataSource:any;
public apiURL: string = environment.apiUrl;

        @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

        uid : string;
        pid:  string;

        constructor(private titleService: Title,private httpClient: HttpClient,public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router,) { }

        ngOnInit() {
                this.preflight();
                this.setTitle();
                this.getUsers();
                // this.dataSource;
        }

u:any;
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

        public users:any; 
        public results:any;

        getUsers() {
                let postData = new FormData();
                // TODO User Angular Service
                var aToken = localStorage.getItem('token');
                const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                const endpoint = 'admin/users'; 

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

                this.dialog.open(dialogEdit, dialogConfig);
        }

      
}


@Component({
        selector: 'dialogEdit',
        templateUrl: 'dialogUserEdit.html',
})
export class dialogEdit implements OnInit {
        userIDfromTable:string;

        constructor(private _snackBar: MatSnackBar,
                private httpClient: HttpClient,private spinner: NgxSpinnerService,
                public dialogRef: MatDialogRef<dialogEdit>,
                @Inject(MAT_DIALOG_DATA) public data: any,) {

                this.userIDfromTable = data.uid; 
        }

        ngOnInit() {
                this.userDetailsPreEdit();
        }

        openSnackBar(message: string) {
                this._snackBar.open(message, '', {
                        duration: 3000
                });
        }


        
public apiURL: string = environment.apiUrl;

        public users:any;
        userDetailsPreEdit() {
                let postData = new FormData();
                let uid = this.userIDfromTable;
                postData.append('uid',uid);
                // TODO User Angular Service
                var aToken = localStorage.getItem('token');
                const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                const endpoint = 'admin/user'; 

                //this should be 
                this.httpClient.post(this.apiURL + endpoint,postData,{headers})
                .subscribe( (res: UserResponseObject) => {
                        this.users = res.results["0"];

                });
        }

        // TODO fix this 
        updateProfile(uid:string,name: string, email: string,phone:string,zipPost:string,Address1:string,Address2:string,city:string,country:string,dob: string,gender: string,homeArcade: string,gamerTag:string,team: string) {
                let postData = new FormData();
                postData.append('uid',uid);
                postData.append('name',name);
                postData.append('email',email);
                postData.append('phone',phone);
                postData.append('zipPost',zipPost);
                postData.append('Address1',Address1);
                postData.append('Address2',Address2);
                postData.append('city',city);
                postData.append('country',country);
                postData.append('dob',dob);
                postData.append('gender',gender);
                postData.append('homeArcade',homeArcade);
                postData.append('gamerTag',gamerTag);
                postData.append('team',team);

                // TODO User Angular Service
                var aToken = localStorage.getItem('token');
                var message = "Profile Updated have a slice 🍕";
                const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                const endpoint = 'admin/users/update'; 

                //this should be 
                this.httpClient.post(this.apiURL + endpoint,postData,{headers})
                .subscribe( (res: ResponseObject) => {
                        message = 'Updated User Profile : Have a cuppa ☕️' 
                        this.openSnackBar( message);
                        this.timer();
                        this.dialogRef.close();
                });
        }
        timer(){
                setTimeout(function(){ location.reload(); }, 3000);
        }



        // @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

        onNoClick(): void {
                this.dialogRef.close();
        }

        // response to send
}
