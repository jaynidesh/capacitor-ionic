import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreCrudService {
  constructor(private firestore: AngularFirestore) {}

  // Create a document
  create(collection: string, data: any): Promise<any> {
    return this.firestore.collection(collection).add(data);
  }

  // Read all documents in a collection
  readAll(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges({ idField: 'id' });
  }

  // Read a single document by ID
  readById(collection: string, id: string): Observable<any> {
    return this.firestore.collection(collection).doc(id).valueChanges();
  }

  // Update a document by ID
  update(collection: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  // Delete a document by ID
  delete(collection: string, id: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }
}


// USAGE

// ng generate component firestore-users

// TS 

// import { Component, OnInit } from '@angular/core';
// import { FirestoreCrudService } from '../firestore-crud.service';

// @Component({
//   selector: 'app-firestore-users',
//   templateUrl: './firestore-users.component.html',
//   styleUrls: ['./firestore-users.component.css'],
// })
// export class FirestoreUsersComponent implements OnInit {
//   users: any[] = [];
//   newUser = { name: '', email: '' };

//   constructor(private firestoreService: FirestoreCrudService) {}

//   ngOnInit() {
//     this.getUsers();
//   }

//   // Create a new user
//   addUser() {
//     this.firestoreService.create('users', this.newUser).then(() => {
//       this.newUser = { name: '', email: '' };
//       this.getUsers(); // Refresh the list
//     });
//   }

//   // Read all users
//   getUsers() {
//     this.firestoreService.readAll('users').subscribe((data) => {
//       this.users = data;
//     });
//   }

//   // Delete a user
//   deleteUser(id: string) {
//     this.firestoreService.delete('users', id).then(() => {
//       this.getUsers(); // Refresh the list
//     });
//   }
// }


// HTML 

// <div>
//   <h2>Firestore Users</h2>

//   <div>
//     <input [(ngModel)]="newUser.name" placeholder="Name" />
//     <input [(ngModel)]="newUser.email" placeholder="Email" />
//     <button (click)="addUser()">Add User</button>
//   </div>

//   <ul>
//     <li *ngFor="let user of users">
//       {{ user.name }} ({{ user.email }})
//       <button (click)="deleteUser(user.id)">Delete</button>
//     </li>
//   </ul>
// </div>
