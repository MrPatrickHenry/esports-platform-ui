// imports for app section
import { Component, OnInit } from '@angular/core';
// to do import { DataService } from '../../data.service';
import {
        MatSnackBar
} from '@angular/material/snack-bar';
import {
        HttpClient,
        HttpParams,
        HttpErrorResponse,
        HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Title }   from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
//models needed
import { Observable, of } from 'rxjs';
export interface ResponseObject {
        data: {
                result: {
                        userType:string;
                };
        }
}

@Component({
        selector: 'app-sign-in',
        templateUrl: './sign-in.component.html',
        styleUrls: ['./sign-in.component.scss']
})


export class SignInComponent implements OnInit {

        constructor(private spinner: NgxSpinnerService,private titleService: Title,private _snackBar: MatSnackBar, private HttpClient: HttpClient,private router: Router,) {}
        private t = {};
        public uid:string;
        public users:any;
        public message:string;

        ngOnInit() {
                this.preflight();
                if (localStorage.getItem("hearts") === null) {
                localStorage.setItem('hearts', '3');
                }
        }

        preflight(){

                var auth = localStorage.getItem('auth');
                var uid = localStorage.getItem('uid');

                if (auth === 'true'){
                        this.router.navigate(['/tournaments']);
                }

        }
        auth(email, password) {

                if (password === ""){
var message = 'Who you think you are! Kevin Flynn? Enter some details.';
                        this.openSnackBar( message);
                        return false;
                }

                this.spinner.show();

                let postData = new FormData();
                postData.append('email', email);
                postData.append('password', password);
                this.HttpClient.post('https://20-twenty.online/api/auth/login', postData)
                .subscribe(data => {
                        // @ts-ignore
                        let aToken = data.access_token;
                        localStorage.setItem('token', aToken);
                        this.userD(aToken);
                        this.spinner.hide();
                         localStorage.setItem('hearts', '3');

                },

                error => {
                        this.spinner.hide();
                        console.log("Error", error);
                                var e = error.message;
                        let hearts = localStorage.getItem('hearts');
                        if (hearts === '3' || null){
                        var message = '❤️ ❤️ 🖤, 2 lives left';
                        this.openSnackBar( message);
                        localStorage.setItem('hearts', '2');

                        }
                        else if (hearts === '2'){
                        localStorage.setItem('hearts', '1');
                        var message = '❤️🖤🖤 , 1 life left';
                        this.openSnackBar( message);
                        }
                        else if (hearts === '1'){
                        localStorage.setItem('hearts', '0');
                        var message = '🖤🖤🖤 , Last Life';
                        this.openSnackBar( message);
                        }
                        else if (hearts === '0'){
                        localStorage.setItem('hearts', '0');
                                var message = '☠️, You have been locked out! Contact Support';
                        this.openSnackBar( message);
                        this.deactivate(email);
                        }
                        
                }
                );
        }

        deactivate(email){
                let postData = new FormData();
                postData.append('email', email);
                this.HttpClient.post('https://20-twenty.online/api/v2/deactivate', postData)
                .subscribe(data => {
                        // @ts-ignore
                        let aToken = data.access_token;
               }), error => {
                        this.spinner.hide();
                        console.log("Error", error);
                                var e = error.message; 
        }


}
        userD(token) {
                const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
                this.HttpClient.get('https://20-twenty.online/api/auth/user',{ headers })
                       .subscribe(data => {
                        // @ts-ignore
                        var userData = data.data;
                        let uusertype = userData.userType;
                        let user = userData.id;
                        console.log(uusertype);
                        this.accountSetup(user,uusertype);
                });
        
}
        //NASTY! to do
        accountSetup(user,uusertype){
                     
                        localStorage.setItem('auth', 'true');
                        localStorage.setItem('uid', user);
                        localStorage.setItem('userType',uusertype);
                           var message = 'You are IN! 🎉🥳'; 
                        this.openSnackBar(message);


this.router.navigateByUrl('/processing', { skipLocationChange: true });
this.router.navigate(["TournamentsComponent"]);
                         location.reload();
        }

        // response to send
        openSnackBar(message: string) {
                this._snackBar.open(message, '', {
                        duration: 3000,
                        panelClass: ['snackbarVAL']
                });

        }




}

