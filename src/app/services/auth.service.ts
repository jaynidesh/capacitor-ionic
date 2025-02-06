import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ : BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(
    private angularFireAuth: AngularFireAuth, 
    private router: Router,
    public toastController : ToastController,
    public loadingController : LoadingController,
    private angularFireDatabase: AngularFireDatabase) {
      console.log(
        this.isLoggedIn().subscribe()
      )
    }

  login(value) {
    this.presentLoading();

    this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          user =>{
            // this.updateUser(user);
            console.log(user)
            environment.UUID = user.user.uid;
            this.presentToast('Login successful')
            this.router.navigateByUrl('/app/tabs/dashboard');
            this.loadingController.dismiss();
          }
        )
        .catch(
          (error : any) => {
            const errorMessage = this.getFriendlyErrorMessage(error.code);
            this.presentToast(errorMessage)
            this.loadingController.dismiss();
          }
        )

  };

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        // .then(
        //   res => resolve(res),
        //   err => reject(err))

        .then(
          user =>{
            this.updateUser(user);
            console.log(user)
            environment.UUID = user.user.uid;
            this.presentToast('Registration successful')
            this.router.navigateByUrl('/app/tabs/dashboard');
            this.loadingController.dismiss();
          }
        )
        .catch(
          (error : any) => {
            const errorMessage = this.getFriendlyErrorMessage(error.code);
            this.presentToast(errorMessage)
            this.loadingController.dismiss();
          }
        )
    })

  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            //console.log("LOG Out");
            environment.UUID = null;
            this.router.navigateByUrl('/login');
          }).catch((error) => {
            reject();
          });
      }
    })
  };

  isLoggedIn() {
    return this.angularFireAuth.authState;
  }

  getUserUUID(){
    return this.angularFireAuth.authState.subscribe((user) => {
      return user.uid
    });
  }

  getFriendlyErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'The email address is not valid.',
      'auth/user-disabled': 'The user account has been disabled.',
      'auth/user-not-found': 'No user found with this email address.',
      'auth/wrong-password': 'The password is incorrect.',
      'auth/too-many-requests': 'Too many login attempts. Please try again later.',
      'auth/invalid-login-credentials': 'Invalid login credentials.'
      // Add more error codes as needed
    };
    
    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  };

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
 
  }

  private updateUser (authData){

    const userData = new User(authData.user);
    console.log(userData)
    const ref = this.angularFireDatabase.object(`/users/${authData.user.uid}/`);
    ref.valueChanges().subscribe(user =>{

      if(!user){
        ref.update(userData)
      }
    })
  };

  

  
  // // Login with Email and Password
  // async logein(email: string, password: string): Promise<void> {
  //   try {
  //     const user = await this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
  //       console.log(res)
  //     }).catch(err => {
  //       console.log(err)
  //     });
  //     // console.log('Login successful:', user);
  //     // this.router.navigate(['/app/tabs/schedule']); // Redirect to the protected route
  //   } catch (error) {
  //     console.error(error);
  //     alert('Login failed: ' + error.message);
  //   }
  // }

  // // Register a New User
  // async register(email: string, password: string): Promise<void> {
  //   try {
  //     const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
  //     console.log('Registration successful:', user);
  //     // this.router.navigate(['/app/tabs/schedule']); // Redirect to the protected route
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     alert('Registration failed: ' + error.message);
  //   }
  // }

  // Logout
  // async logout(): Promise<void> {
  //   try {
  //     await this.afAuth.signOut();
  //     console.log('Logout successful');
  //     this.router.navigate(['/login']); // Redirect to the login page
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     alert('Logout failed: ' + error.message);
  //   }
  // }

  // Check Authentication State
  // isLoggedIn() {
  //   return this.afAuth.authState;
  // }
}
