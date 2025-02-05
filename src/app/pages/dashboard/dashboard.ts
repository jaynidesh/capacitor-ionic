import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Config } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { RealtimeCrudService } from '../../services/realtime-crud.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardPage implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: any;
  barChart: any;

  ios : boolean;
  user_id;
  user_data;
  user_slots;
  months : any = [
    { "id": 1, "name": "January" },
    { "id": 2, "name": "February" },
    { "id": 3, "name": "March" },
    { "id": 4, "name": "April" },
    { "id": 5, "name": "May" },
    { "id": 6, "name": "June" },
    { "id": 7, "name": "July" },
    { "id": 8, "name": "August" },
    { "id": 9, "name": "September" },
    { "id": 10, "name": "October" },
    { "id": 11, "name": "November" },
    { "id": 12, "name": "December" }
  ]

  constructor(
    public config: Config,
    private authService: AuthService,
    private realtimeCrudService : RealtimeCrudService,
    private afAuth : AngularFireAuth,
    
  ) { }

  ngAfterViewInit() {

    this.ios = this.config.get('mode') === 'ios';
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user)
        // If user is logged in, redirect to the dashboard
        // this.router.navigate(['/app/tabs']); // Adjust to your dashboard route
      }
    });

    // this.authService.getUserUUID()
    this.user_id = environment.UUID;

    this.getUserData();

  }

  getUserData(){
    this.realtimeCrudService.get(`/users/${this.user_id}`).subscribe(val =>  {
      console.log(val)
      this.user_data = val;
      this.user_slots = val.slots;
    })
  }

  logout() {
    this.authService.logoutUser();
  };

}
