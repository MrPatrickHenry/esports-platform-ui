// profile imports
import { Component,Inject,OnInit,ViewChild } from '@angular/core';
import {
        HttpClient,
        HttpParams,
        HttpErrorResponse,
        HttpResponse,
        HttpHeaders,
        HttpEventType } from '@angular/common/http';
        import {MatPaginator} from '@angular/material/paginator';
        import {MatTableDataSource} from '@angular/material/table';

        import { Router } from '@angular/router';
        import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
        import { NgxSpinnerService } from "ngx-spinner";
        import { FormControl } from '@angular/forms';
        import { Observable } from 'rxjs';
        import { map, startWith } from 'rxjs/operators';
        import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
        import { MatSnackBar } from '@angular/material/snack-bar';
        import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
        import { Title }     from '@angular/platform-browser';
        import { ActivatedRoute } from "@angular/router";
        import { environment } from '../../../../environments/environment';


        // models
        export interface ResponseObject {
                data: {
                        result: {
                                userType:{};
                        };
                }
        }

export interface arcadeResponseObject{
data: {
        title:{};
  result:{};
arcade: {};
media:{};
team:{};
scores:{};
}
}
        export interface teamResponseObject{
                data:{
                        results: {}
                }
        }
        export interface Types {
                value:string;
                viewValue: string;
        }

        export interface Lincenses{
                value:string;
                viewValue:string;
        }

        export interface TimeZone {
                value:string;
                viewValue: string;
        }

        export interface Arcade {
                value:string;
                viewValue:string;
        }

        export interface User {
                name: string;
        }

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

                displayedColumns: string[] = ['season','startDate','endDate', 'rewards','likes'];
                dataSource:any;

                @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

                uid : string;
                pid:  string;


                public user: string;
                public selectedFile: File;
                public selectedImageUrl: string;
                public isMobile: boolean;
                public AuthUser:string;
                public users:any;
                public media:any;
                public titleData:any;
                public userAuth:string;
                public teamData:any;
                public shortTag:any;
                public scoresData:{};
                public apiURL: string = environment.apiUrl;

                constructor(private route: ActivatedRoute, public dialog: MatDialog,private spinner: NgxSpinnerService,private titleService: Title,private _snackBar: MatSnackBar,private httpClient: HttpClient,
                        private router: Router,private _bottomSheet: MatBottomSheet ) {}

                //Initialisation
                ngOnInit() {
                        this.setTitle();
                        this.titleDetails();
                        this.spinner.hide();[]
                }

                public setTitle() {
                        this.titleService.setTitle( 'Game Title Page' );
                }

                titleDetails() {
                        this.shortTag = this.route.snapshot.paramMap.get("titleName")
                        this.spinner.show();
                        let postData = new FormData();
                        postData.append('shortTag',this.shortTag);
                        var aToken = localStorage.getItem('token');
                        const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
                        const endpoint = 'title/show/'; 
                        this.httpClient.post(this.apiURL + endpoint,postData,{headers})
                        .subscribe( (res: arcadeResponseObject) => {
                                this.users = res.data.title["0"];
         this.dataSource = new MatTableDataSource(res.data["0"].tournaments);
                                console.log(this.users);
                        });
                }

        }
