//new code
import { Component,Inject,OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import {
        HttpClient,
        HttpParams,
        HttpErrorResponse,
        HttpResponse,
        HttpHeaders,
        HttpEventType
} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {
        Router
} from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {
        MatSnackBar
} from '@angular/material/snack-bar';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Title }     from '@angular/platform-browser';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { environment } from '../../../environments/environment';


export interface scoresResponseObject {
  data:any;
}

export interface ResponseObject {
  data: {
    result: {
      type:any;
    };

  }
}




@Component({
  selector: 'app-score-management',
  templateUrl: './score-management.component.html',
  styleUrls: ['./score-management.component.scss']
})

export class ScoreManagementComponent implements OnInit {
  displayedColumns: string[] = ['id','round', 'Match1Score','Match2Score', 'Match3Score','winner','dispute','confirmed'];
  dataSource:any;
  dataSourceDisputes:any;
  dataSourceHistory:any;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  uid : string;
  pid:  string;

  constructor(private changeDetectorRefs: ChangeDetectorRef,private _snackBar: MatSnackBar,private titleService: Title,private httpClient: HttpClient,public dialog: MatDialog,private spinner: NgxSpinnerService,private router: Router,) { }

  ngOnInit() { 
    this.preflight();
    this.spinner.show();
    this.getScores();
    this.getDisputes();
    this.getScoreHistory();
  }


  u:any;
  preflight() {
    let aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    this.httpClient.get('https://20-twenty.online/api/auth/user', {
      headers})
    .subscribe((res: ResponseObject) => {
      this.u = res.data.result;  
      if(this.u.userType != 'VALAdmin'){
        this.router.navigate(['/player/profile']); 
      }      
    });
  };




  scoreDetailsModel(id:string) {
    let  sid = id;
    const dialogRef = this.dialog.open(scoreDetails, {
      height: '100vh',
      width: '70%',          
      panelClass: 'custom-modalbox',
      data: {id: this.uid}

    });
  }




public apiURL: string = environment.apiUrl;

  public scoresResponseObject:any;
  public score:any;
  getScores() {
    // need to map to reduce calls
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/scoresReview'; 

    this.httpClient.get(this.apiURL + endpoint,{headers})
    .subscribe( (res: scoresResponseObject) => {
      this.dataSource = new MatTableDataSource(res.data);
    });
    this.spinner.hide();

  }

  getDisputes() {
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/scoresDisputes'; 

    this.httpClient.get(this.apiURL + endpoint,{headers})
    .subscribe( (res: scoresResponseObject) => {
      this.dataSourceDisputes = new MatTableDataSource(res.data);

    });
  }


  getScoreHistory() {
    // TODO User Angular Service
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'admin/scores'; 
    this.httpClient.get(this.apiURL + endpoint,{headers})
    .subscribe( (res: scoresResponseObject) => {
      this.dataSourceHistory = new MatTableDataSource(res.data);
    });
  }
  public action:any;
  id:any;
  dispute:string;
  updateScore(id:string,action:string,e){
    var state = '0'
    if(e.checked != true){
      state = '0';
    }
    else{
      state = '1';
    } 

    // TODO User Angular Service
    let postData = new FormData();
    postData.append("id", id);
    postData.append(action,state);

    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
const endpoint = 'admin/score'; 

    this.httpClient.post(this.apiURL + endpoint,postData,{headers})
    .subscribe( (res: scoresResponseObject) => {
      let message = 'Successfully updated ID ' + id ;
      this.openSnackBar( message);
      this.getScores();

    });
  }

  refresh(){
    this.changeDetectorRefs.detectChanges();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });

  }



}



//model

//ScoreSubmission
@Component({
  selector: 'scoreDetails',
  templateUrl: 'scoreModel.html',
})
export class scoreDetails implements OnInit {

  scoreID:string;

  constructor(private _snackBar: MatSnackBar,
    private httpClient: HttpClient,private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<scoreDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.scoreID = data.id; 
  }

  ngOnInit() {
    this.scoreDetails();
  }

 onNoClick(): void {
    this.dialogRef.close();
  }


  // retrieve all users competing
  api = "https://20-twenty.online/api/v1/tournaments/competitors";
public apiURL: string = environment.apiUrl;

  public competitors:any;
  scoreDetails(){
    const formData: any = new FormData();
    formData.append('tid',this.scoreID);
    var aToken = localStorage.getItem('token');
    const endpoint = 'tournaments/competitors'; 
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    this.httpClient.post(this.apiURL + endpoint,formData,{headers})
    .subscribe( (res: ResponseObject) => {
      this.competitors = res.data["0"].results;
    });
  }

  
}
