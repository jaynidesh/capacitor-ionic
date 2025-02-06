import { Component, ViewChild, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Config } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { RealtimeCrudService } from '../../../services/realtime-crud.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../../../environments/environment';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-cycle-management',
  templateUrl: './cycle-management.component.html',
  styleUrl: './cycle-management.component.scss'
})
export class CycleManagementComponent implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: any;
  @ViewChildren('chartCanvas') chartCanvases: QueryList<any>;
  barChart: Chart[] = [];
  userOpenedSection = null;
  ios : boolean;
  user_id;
  slots_data;
  users_data;
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
  ];

  slots;

  current_month;

  user_active_slot_segment = "slot_0"

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
    // this.getMonthlyContributions()
    // this.createBarChart();

    
      this.current_month = new Date().toLocaleString('en-US', { month: 'long' });
    
  }

  getUserData(){
    this.realtimeCrudService.get(`/users/`).subscribe(val =>  {
      this.users_data = val;
    })
    this.realtimeCrudService.get(`/slots/`).subscribe(val =>  {
      this.slots_data = val;
      this.slots = Array.from({ length: val.length }, (_, index) => index);

      this.userOpenedSection = `1_${this.current_month}`;

    });
   
  }

  getMonthlyContributions(index){
    const contributions = Array(12).fill(0);
    Object.values(this.users_data).forEach((user: any) => {
      if (user.slots && user.slots[index]) {
        const slot = user.slots[index];

        if (slot.contributions) {
          slot.contributions.forEach((value: any, index: number) => {
            const count = Array.isArray(value)
              ? this.countTrueValues(value)
              : value === true ? 1 : 0;

            contributions[index] += count;
          });
        }
      }
    });
    return contributions;
  }

  logout() {
    this.authService.logoutUser();
  };

  openSection(slot, month){
    this.userOpenedSection = `${slot}_${month}`;
  }

  getSectionName(slot, month){
    return `${slot}_${month}`
  }

  markAsPaymentDone(slot, month, member){
    this.realtimeCrudService.set(`/users/${member}/slots/${slot}/contributions/${month.id - 1}`, true)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  markAsPaymentNotDone(slot, month, member){
    this.realtimeCrudService.set(`/users/${member}/slots/${slot}/contributions/${month.id - 1}`, false)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  markAsDeliveryDone(slot, month, member){
    this.realtimeCrudService.set(`/users/${member}/slots/${slot}/delivered`, true)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  markAsDeliveryNotDone(slot, month, member){
    this.realtimeCrudService.set(`/users/${member}/slots/${slot}/delivered`, false)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // getMonthlyContributions(slotIndex: number): number[] {

    

  //   console.log(this.users_data[slotIndex]?.contributions)
  //   return this.users_data[slotIndex]?.contributions || [];
  // }

  // getMonthlyContributions(slotIndex: number) {
  //   this.realtimeCrudService.get('users').subscribe((users: any) => {
  //     const contributions = Array(12).fill(0); // Initialize an empty array for the 12 months
  
  //     Object.values(users).forEach((user: any) => {
  //       if (user.slots && user.slots[slotIndex]) {
  //         const slot = user.slots[slotIndex];
  
  //         if (slot.contributions) {
  //           slot.contributions.forEach((value: any, index: number) => {
  //             const count = Array.isArray(value)
  //               ? this.countTrueValues(value)
  //               : value === true ? 1 : 0;
  
  //             contributions[index] += count;
  //           });
  //         }
  //       }
  //     });
  
  //     console.log(`Slot ${slotIndex + 1} Contributions:`, contributions);
  //     // this.createBarChart(contributions, slotIndex);
  //   });
  // }
  
  private countTrueValues(arr: any[]): number {
    return arr.reduce((sum, val) => sum + (Array.isArray(val) ? this.countTrueValues(val) : val === true ? 1 : 0), 0);
  }

  changeSegment(val){
    console.log(val)
    this.user_active_slot_segment = `slot_${val}`;
    this.userOpenedSection = `${val+1}_${this.current_month}`;
  }


  
  

}
