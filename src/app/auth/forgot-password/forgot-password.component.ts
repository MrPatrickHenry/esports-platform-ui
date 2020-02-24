import {
        Component,
        OnInit
} from '@angular/core';
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
export interface ResponseObject {
        data: {
                result: {
                        userType:{};
                };

        }
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient,private router: Router,) { }

        ngOnInit() {
        }

        whoami(email){
            if(email === ""){
               var messages = 'I am not neo... I need your email';
             this.openSnackBar(messages);

            }
                var aToken = localStorage.getItem('token');
                const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                let postData = new FormData();
                postData.append('email', email);
                                let message = 'Reset link has been sent via 📧 '

                this.httpClient.post('https://20-twenty.online/password/email',postData)
                .subscribe( (res: ResponseObject) => {
                                    this.openSnackBar(message);
                        this.router.navigate(['/signin']);

                });
        }
        


        // response to send
        openSnackBar(message: string) {
                this._snackBar.open(message, '', {
                        duration: 3000
                });

        }


}