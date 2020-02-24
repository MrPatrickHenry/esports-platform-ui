import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl,ReactiveFormsModule  } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Title } from '@angular/platform-browser';
// import { Observable, Subject, asapScheduler, pipe, of, from,
  //   interval, merge, fromEvent } from 'rxjs';
  import { filter, scan } from 'rxjs/operators';
  import { Router,ActivatedRoute } from '@angular/router';
  import { environment } from '../../../environments/environment';
  export interface ResponseObject {
    data: {
      unreadNotifications:{};
      readNotifications:{};
      unReadCount:{};
      arcade:{};
      result: {
        userType: {};
      };

    }
  }
  @Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
  })
  export class NotificationsComponent implements OnInit {
    unreadNotifications:any;
    readNotifications:any;
    unreadCount:any;
    constructor(private router: Router,private httpClient: HttpClient) { }
    public apiURL: string = environment.apiUrl;

    ngOnInit() {
      console.log('starting to get data');
      this.getNotificationData()
      console.log('finished getting data');
    }


    getNotificationData() {
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('id',uid);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/notifications'; 
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.unreadNotifications = res.data.unreadNotifications;
        this.readNotifications = res.data.readNotifications;
        this.unreadCount = res.data.unReadCount;
      });
    }


    deleteNotification(notificationID){
let postData = new FormData();
      postData.append('id',notificationID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/notifications/delete'; 
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
      console.log('done');
      });
    }

    markRead(notificationID){
let postData = new FormData();
      postData.append('id',notificationID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/notifications/read'; 
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
      console.log('done');
      });
    }


// to do come back to this method
    //   getNotificationData(){
      //             let uid = localStorage.getItem('uid');
      //         this.dataService.getNotifications(uid).subscribe((data: any[])=>{
        //     this.notifications = data;
        //     console.log(this.notifications);
        // }) 
        //   }

      }
