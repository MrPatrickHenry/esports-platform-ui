import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent implements OnInit {

    constructor(private router: Router) {}

  ngOnInit() {
  	        this.preflight;
  }

preflight(){
                let auth = localStorage.getItem('auth');
                console.log(auth);
            }

goSignup(){
  this.router.navigate(['/register']);
}
}