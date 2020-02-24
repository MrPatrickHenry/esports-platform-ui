import {
  Component,
  OnInit
} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';
export interface ResponseObject {
  data: {
    result: { 
      userType:any;
      id:any;
    };
  }
}

export interface Types {
  value:string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  Type: Types[] = [
  {value: 'Player', viewValue: 'Player'},
  {value: 'Arcade Owner', viewValue: 'Arcade Owner'}
  ];

  constructor(private spinner: NgxSpinnerService,private _snackBar: MatSnackBar, private httpClient: HttpClient,private router: Router) {}

  private u:any ;

  ngOnInit() {
    console.log(this.ageCheck(new Date(1982, 11, 4)));
  }
public usersAge:any;
ageCheck(dob){
  var dobString = new Date(dob);
  var diff_ms = Date.now() - dobString.getTime();
  var age_dt = new Date(diff_ms); 
   this.usersAge = Math.abs(age_dt.getUTCFullYear() - 1970);
  if (this.usersAge <= 12){
   var message = "Your too young! You must have been able to play Portal when it was released";
   this.openSnackBar(message);
  }
}


  signup(name:string,email: string, userType: string,gamertag:string){
        this.spinner.show();
if(this.usersAge <=12){
  var message = "Your too young! You must have been able to play Portal when it was released";
   this.openSnackBar(message);
   return false;
}
    let postData = new FormData();
    postData.append('name',name);
    postData.append('email', email);
    postData.append('userType', userType);
    postData.append('gamertag', gamertag);
    this.httpClient.post('https://20-twenty.online/api/auth/signup', postData).subscribe(
      data => {
            this.spinner.hide();

        this.userD();
      },
      error => {
        console.log("Error", error);

        var message = 'Sorry something went wrong: ';
                if (error.error.errors.name != null){
          var e = error.error.errors.name["0"];
         this.openSnackBar( message + e);
        }
        if (error.error.errors.email != null){
          var e = error.error.errors.email["0"];
         this.openSnackBar( message + e);
        }
        if(error.error.errors.gamertag !=null){
        var e = error.error.errors.gamertag["0"];
        this.openSnackBar( message + e);

        }
                this.spinner.hide();

      }
      );

  }
  private usertype:string;

  userD() {
    var message = 'Welcome to VAL! Please check your e-mail for activation link';  
    this.openSnackBar(message);
    this.router.navigate(['/signin']);
  };


  // response to send
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 6000
    });

  }


}
