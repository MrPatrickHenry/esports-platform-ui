import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { auth } from '../../services/auth';
import { DataService } from '../data.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

//all this to be in components and not modules
export class FooterComponent implements OnInit {

    system:any;

    isMobile: boolean;
    isloggedIn: boolean;
    version:any;

    date = new Date();
    copyrightDate = this.date.getFullYear();

    constructor(private router: Router,private dataService: DataService) { }
    ngOnInit() {
        var auth = localStorage.getItem('auth');
        if (auth === 'true'){
            this.isloggedIn = true
        }

        if (window.innerWidth < 768) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }


        // IDEAL
        this.dataService.sendGetRequest().subscribe((data: any[])=>{
            this.system = data;
        })  
    }


gosignIn(){
              this.router.navigate(['/signin']);
}

goTournaments(){
              this.router.navigate(['/tournaments']);
}

goDirectory(){
              this.router.navigate(['/directory']);
}
}