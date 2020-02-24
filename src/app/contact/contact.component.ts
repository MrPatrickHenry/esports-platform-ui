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
  import { environment } from '../../environments/environment';

  export interface ResponseObject {
    data: {
      arcade:{};
      result: {
        userType: {};
      };

    }
  }

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

 constructor(public dialog: MatDialog, private spinner: NgxSpinnerService, private titleService: Title, private _snackBar: MatSnackBar, private httpClient: HttpClient,
      private router: Router, private _bottomSheet: MatBottomSheet) { }
    public apiURL: string = environment.apiUrl;

  ngOnInit() {
  }

messageSubmission(name,company,country,email,message){
      this.spinner.show();
      let postData = new FormData();
      postData.append('name', name);
            postData.append('company', company);
      postData.append('country', country);
      postData.append('email', email);
       postData.append('message', message);

      // to do User Angular Service
      const endpoint = 'send/message/marketing'; 
      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData)
      .subscribe((res: ResponseObject) => {
                                this.spinner.hide();

let messages = 'We have received your message and will be in touch soon: 🤩';
this.openSnackBar(messages);
     } , error => {
                        this.spinner.hide();
                        console.log("Error", error);
                         let e = error.message;
                         return this.openSnackBar('some data was missing ☝️');

                        }
              
     );

}

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 3000
      });
    }
}
