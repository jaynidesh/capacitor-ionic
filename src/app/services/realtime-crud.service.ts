import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeCrudService {
  constructor(private db: AngularFireDatabase) {}

  // Create or Update an object
  set(path: string, data: any): Promise<void> {
    return this.db.object(path).set(data);
  }

  // Read an object
  get(path: string): Observable<any> {
    console.log(path)
    return this.db.object(path).valueChanges();
  }

  // Update an object
  update(path: string, data: any): Promise<void> {
    return this.db.object(path).update(data);
  }

  // Delete an object
  delete(path: string): Promise<void> {
    return this.db.object(path).remove();
  }
}

// USAGE 

// ng generate component realtime-users

// TS 

// import { Component, OnInit } from '@angular/core';
// import { RealtimeCrudService } from '../realtime-crud.service';

// @Component({
//   selector: 'app-realtime-users',
//   templateUrl: './realtime-users.component.html',
//   styleUrls: ['./realtime-users.component.css'],
// })
// export class RealtimeUsersComponent implements OnInit {
//   users: any = {};
//   newUser = { name: '', email: '' };

//   constructor(private realtimeService: RealtimeCrudService) {}

//   ngOnInit() {
//     this.getUsers();
//   }

//   // Create or update a user
//   addUser() {
//     const id = new Date().getTime().toString();
//     this.realtimeService.set(`/users/${id}`, this.newUser).then(() => {
//       this.newUser = { name: '', email: '' };
//       this.getUsers(); // Refresh the list
//     });
//   }

//   // Read all users
//   getUsers() {
//     this.realtimeService.get('/users').subscribe((data) => {
//       this.users = data;
//     });
//   }

//   // Delete a user
//   deleteUser(id: string) {
//     this.realtimeService.delete(`/users/${id}`).then(() => {
//       this.getUsers(); // Refresh the list
//     });
//   }
// }


// HTML 

// <div>
//   <h2>Realtime Database Users</h2>

//   <div>
//     <input [(ngModel)]="newUser.name" placeholder="Name" />
//     <input [(ngModel)]="newUser.email" placeholder="Email" />
//     <button (click)="addUser()">Add User</button>
//   </div>

//   <ul>
//     <li *ngFor="let key of (users | keyvalue)">
//       {{ key.value.name }} ({{ key.value.email }})
//       <button (click)="deleteUser(key.key)">Delete</button>
//     </li>
//   </ul>
// </div>
