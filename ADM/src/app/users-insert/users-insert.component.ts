import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from '../../interfaces/users';
import { UserService } from 'src/services/user.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-users-insert',
  templateUrl: './users-insert.component.html',
  styleUrls: ['./users-insert.component.scss']
})
export class UsersInsertComponent implements OnInit {

  public birthdayMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cellPhoneMask = ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]

  private userRequest: FormGroup;
  private selectedFile = null;

  public showNotification = false;

  //  firebase
  uploadPercent: Observable<number>;

  constructor(  formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private userService: UserService,
                private router: Router) {
    this.userRequest = formBuilder.group({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required]),
      'cellphone': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'cpf': new FormControl(null, [Validators.required]),
      'admin': new FormControl(null, [Validators.required]),
      'photo': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {}

  onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.userRequest.patchValue({
        "photo": new Date() + this.selectedFile.name
      });
  }

  submitForm(request: IUser) {

    const task = this.storage.upload("users/"+request.photo, this.selectedFile);

    this.uploadPercent = task.percentageChanges();

    // uploading file
    task.snapshotChanges().pipe(
        //if comes here, the file was uploaded

        //call function responsable for saving the data on the bd
        finalize(() => this.insertUser(request) )
     )
    .subscribe()
  }

  insertUser(request){
    request.cpf = request.cpf.replace(/\D+/g, '');
    request.cellphone = request.cellphone.replace(/\D+/g, '');
    request.birthday = moment(request.birthday).format('YYYY-MM-DD');

    this.userService.insertUser(request)
    .subscribe(
      res => {
        // console.log(res);
        this.showNotification = true;
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      },
      err => {
        // console.log(err);
      }
    );
  }

}
