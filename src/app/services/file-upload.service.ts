import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RuleTester } from 'eslint';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  // Upload a file to Firebase Storage
  uploadFile(path: string, file: File): Observable<string> {
    const fileRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path, file);

    return new Observable<string>((observer) => {
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (downloadURL) => {
                observer.next(downloadURL);
                observer.complete();
              },
              (error) => observer.error(error)
            );
          })
        )
        .subscribe();
    });
  }

  // Delete a file from Firebase Storage
  deleteFile(path: string): Promise<void> {
    const fileRef = this.storage.ref(path);
    return fileRef.delete().toPromise();
  }
}


// USAGE

// ng generate component file-upload

// TS

// import { Component } from '@angular/core';
// import { FileUploadService } from '../file-upload.service';

// @Component({
//   selector: 'app-file-upload',
//   templateUrl: './file-upload.component.html',
//   styleUrls: ['./file-upload.component.css'],
// })
// export class FileUploadComponent {
//   selectedFile?: File;
//   uploadProgress: number = 0;
//   downloadURL?: string;

//   constructor(private fileUploadService: FileUploadService) {}

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//     }
//   }

//   uploadFile() {
//     if (this.selectedFile) {
//       const path = `uploads/${Date.now()}_${this.selectedFile.name}`;
//       this.fileUploadService.uploadFile(path, this.selectedFile).subscribe(
//         (url) => {
//           this.downloadURL = url;
//           alert('File uploaded successfully!');
//         },
//         (error) => {
//           console.error('File upload failed:', error);
//           alert('File upload failed!');
//         }
//       );
//     } else {
//       alert('No file selected!');
//     }
//   }

//   deleteFile() {
//     if (this.downloadURL) {
//       const path = new URL(this.downloadURL).pathname.substring(1);
//       this.fileUploadService.deleteFile(path).then(
//         () => {
//           alert('File deleted successfully!');
//           this.downloadURL = undefined;
//         },
//         (error) => {
//           console.error('File deletion failed:', error);
//           alert('File deletion failed!');
//         }
//       );
//     } else {
//       alert('No file to delete!');
//     }
//   }
// }

// HTML

// <div class="file-upload-container">
//   <h2>File Upload</h2>

//   <input type="file" (change)="onFileSelected($event)" />
//   <button (click)="uploadFile()">Upload File</button>

//   <div *ngIf="downloadURL">
//     <p>File Uploaded:</p>
//     <a [href]="downloadURL" target="_blank">Download File</a>
//     <button (click)="deleteFile()">Delete File</button>
//   </div>
// </div>

// CSS

// .file-upload-container {
//   width: 300px;
//   margin: auto;
//   text-align: center;
//   border: 1px solid #ccc;
//   padding: 20px;
//   border-radius: 5px;
// }

// button {
//   margin: 10px;
//   padding: 10px 15px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// button:hover {
//   background-color: #0056b3;
// }

// a {
//   display: block;
//   margin: 10px 0;
// }


// Firebase storage rules

// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /uploads/{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }