import { Component, OnInit, OnChanges} from '@angular/core';
import {
    HttpClient,
    HttpParams,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

import { timer, of, Observable, Subject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

export interface ResponseObject {
    data: any;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'val-app-v2';
    public apiURL: string = environment.apiUrl;
    public isMobile: boolean;
    public isloggedIn: boolean;
    public userType: string;
    public AuthUser:any;
    public notificationCount:any;
    public profileComplete:any;
    private t = {};
    public userServices:any;
    public featureServices:any;
    constructor(private HttpClient: HttpClient,private router: Router,) {}

    ngOnInit() {
        this.enviromentCheck();
                var auth = localStorage.getItem('auth');

        if (auth != null)
        {
            this.featureServiceRequest(authToken);
        }

        var authToken = localStorage.getItem('token');
        var userType = localStorage.getItem('user');
        // move to case or actions to do
        if (userType === 'VALAdmin'){
            this.AuthUser === 'ValAdmin';
        }else if (userType ==='Player')
        {
            this.AuthUser === 'Player';
        }
        else if (userType === 'Arcade Owner'){
            this.AuthUser === 'Arcade Owner';
        }
        else {
            this.AuthUser === 'Guest';
        }
        // TURN TO GLOBAL OR ON THE SERVICE AND ROUTES

        
        if (auth === 'true'){
            this.isloggedIn = true
        }

        if (window.innerWidth < 768) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    enviromentCheck(){
        console.log(environment.apiUrl);
    }

    //authCheckAndFeatureService
    featureServiceRequest(token:string) {
        var aToken = localStorage.getItem('token');
        var uid = localStorage.getItem('uid');
        let postData = new FormData();
        postData.append('id', uid);
        const endpoint = 'user/featureService'; 
        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
        this.HttpClient.post(this.apiURL + endpoint,postData, {headers})
        .subscribe((res: ResponseObject) => {
            this.userServices = res.data.result["0"];
            this.featureServices = res.data.navigation;  
            this.profileComplete = res.data;
            this.notificationCount = res.data.notifications;
        });
    }
}