import { Component, OnInit } from '@angular/core';
import {
        HttpClient,
        HttpParams,
        HttpErrorResponse,
        HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';

export interface ResponseObject {
        data: {
                result: {};
        }
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
        title = 'val-app-v2';

                public isMobile: boolean;
        public isloggedIn: boolean;
        public userType: string;
        public AuthUser:any;
public profileComplete:any;
        constructor(private HttpClient: HttpClient,private router: Router,) {}
        private t = {};
        public userServices:any;
        public featureServices:any;
        ngOnInit() {

                var authToken = localStorage.getItem('token');
                var userType = localStorage.getItem('user');

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

                var auth = localStorage.getItem('auth');
                
                if (auth === 'true'){
                        this.isloggedIn = true
                }

                if (window.innerWidth < 768) {
                        this.isMobile = true;
                } else {
                        this.isMobile = false;
                }


if (this.isloggedIn){
this.featureServiceRequest(authToken);
}    

}

        //authCheckAndFeatureService
        featureServiceRequest(token:string) {
                 var aToken = localStorage.getItem('token');
                    var uid = localStorage.getItem('uid');
    let postData = new FormData();
    postData.append('id', uid);
                const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                this.HttpClient.post('https://20-twenty.online/api/v1/users/featureService',postData, {headers})
                .subscribe((res: ResponseObject) => {
                        this.userServices = res.data["0"].result["0"];
                        this.featureServices = res.data["1"].navigation;  
                        this.profileComplete = res.data["2"];
                });
        }
}