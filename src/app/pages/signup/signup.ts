import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { email: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private authService: AuthService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // this.authService.register(this.signup.email, this.signup.password);
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}
