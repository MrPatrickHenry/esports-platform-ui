import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import {
        HttpClient,
        HttpParams,
        HttpErrorResponse,
        HttpResponse,
        HttpHeaders,
        HttpEventType
} from '@angular/common/http';
import {
        MatSnackBar
} from '@angular/material/snack-bar';
import { Title }     from '@angular/platform-browser';

export interface ResponseObject {
        data: {
                result: {
                        userType:{};
                };

        }
}

@Component({
        selector: 'app-password-reset',
        templateUrl: './password-reset.component.html',
        styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

        constructor(private httpClient: HttpClient,private _snackBar: MatSnackBar,private route: ActivatedRoute,private router: Router) { }
        public email:string
        public token: any;
        private sub: any;

        ngOnInit() {
        }

        public data:any;
        // public email:string;
        // public password:string;
        // public password_confirmation:string;
        passwordReset(password:string,password_confirmation:string){
                let pword = password;
                let pwordConfirm = password;
                let email = this.email = this.route.snapshot.queryParamMap.get("email");
                let token = this.token = this.route.snapshot.params['token'];

                let postData = new FormData();
                postData.append('token',token);
                postData.append('password',pword);
                postData.append('password_confirmation',pwordConfirm);
                postData.append('email',email);


                this.httpClient.post('https://20-twenty.online/api/auth/reset',postData)
                .subscribe( (res: ResponseObject) => {

                let message = 'Password Changed Succesfully 🎉🥳';        
                this.openSnackBar(message);
                this.router.navigate(['/signin']);
                });

        }

        openSnackBar(message: string) {
                this._snackBar.open(message, '', {
                        duration: 3000
                });

        }

}
