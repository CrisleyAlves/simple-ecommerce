import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from '../../../interfaces/users';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  public birthdayMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cellPhoneMask = ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]

  private userRequest: FormGroup;

  public showNotification = false;

  constructor(  formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute) {
    this.userRequest = formBuilder.group({
      'id': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'birthday': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'cellphone': new FormControl(null, [Validators.required]),
      'cpf': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'admin': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe((data) => {
      if(data.body === null){
          this.router.navigate(['/users']);
      }else{
          this.userRequest.patchValue(data.body);
      }
    });
  }

  submitForm(request: IUser) {

    request.cellphone = request.cellphone.replace(/\D+/g, '');

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
    // alert(request.deckSize);
  }

}
