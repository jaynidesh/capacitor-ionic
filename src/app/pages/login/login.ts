import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit{
  login: UserOptions = { email: '', password: '' };
  loading: boolean = false;
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) { 

  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // If user is logged in, redirect to the dashboard
        this.router.navigate(['/app/tabs']); // Adjust to your dashboard route
      }
    });
  }


  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  // onLogein(form: NgForm) {
  //   this.submitted = true;
  //   if (form.valid) {
  //     this.authService.login(this.login.email, this.login.password);
  //     this.router.navigateByUrl('/app/tabs/schedule');
  //   }
    
  // }

  onLogin(value: NgForm) {
    this.submitted = true;

    if (value.valid) {

      this.authService.login(this.login);
    }
  };


  // async onwLogin(form: NgForm) {
  //   this.submitted = true;
  //   if (form.valid) {
  //     this.loading = true; // Show loading spinner or disable button
  //     const success : any = await this.authService.login(this.login.email, this.login.password).then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     });
  //     this.loading = false; // Hide loading spinner or enable button

  //     if (!success) {
  //       alert('Login failed. Please try again.');
  //     }
  //   }
  // }

  
}
