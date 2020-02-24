import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient,private router: Router,) { }

  ngOnInit() {
    var auth = localStorage.getItem('auth');
    // TURN TO GLOBAL OR ON THE SERVICE AND ROUTES
    if (auth === 'true'){
      this.logout();
    }else{
      this.router.navigate(['/signin']);

    }
  }


  logout() {
    console.log('loggin out');

    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);

    this.httpClient.get('https://20-twenty.online/api/auth/logout', {
      headers
    }).subscribe((res: any[]) => {
      var message ='Logged Out';
      this.openSnackBar(message);
      localStorage.clear();
this.router.navigateByUrl('/processing', { skipLocationChange: true });
this.router.navigate(["SignInComponent"]);
location.reload();


    });

  }

  // response to send should be a service to use through the system
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });

  }

}
