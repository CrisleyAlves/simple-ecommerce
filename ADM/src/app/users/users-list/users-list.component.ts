import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { DangerModalComponent } from '../../shared/danger-modal/danger-modal.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { IUser } from 'src/interfaces/users';
import * as moment from 'moment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(DangerModalComponent) dangerModal: DangerModalComponent;

  public users: any;
  public userToDelete = null;

  public birthdayMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  private filterRequest: FormGroup;

  constructor(formBuilder: FormBuilder, private _userService: UserService, private changeDetector : ChangeDetectorRef) {
    this.filterRequest = formBuilder.group({
      'birthday': new FormControl(''),
      'cpf': new FormControl('')
    });
   }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this._userService.getUsers().subscribe(data => this.users = data);
  }

  applyFilter(request: IUser){
    
    request.cpf = request.cpf.replace(/\D+/g, '');
    
    if(request.cpf.length === 11 || request.birthday.replace(/\D+/g, '').length == 8){
      this._userService.filter(request).subscribe(data => this.users = data.body);
    }else{
      this.getAllUsers();
    }
    
  }

  deleteUserConfirm(userId){
    this.userToDelete = userId;
    this.changeDetector.detectChanges(); // parent couldn't see the child component 'cause of the *ngIf in the html, it detects the changes
    this.dangerModal.handlerShowModal();
  }

  deleteUser(id){
    this._userService.deleteUserById(id)
    .subscribe(
      res => {
        this.getAllUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

}
