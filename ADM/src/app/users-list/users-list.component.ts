import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { DangerModalComponent } from '../shared/danger-modal/danger-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(DangerModalComponent) dangerModal: DangerModalComponent;

  public users = [];
  public userToDelete = null;

  constructor(private _userService: UserService, private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this._userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUserConfirm(userId){
    // I'M UPDATING HERE
    this.userToDelete = userId;
    this.changeDetector.detectChanges(); // parent couldn't see the child component 'cause of the *ngIf in the html, it detects the changes
    this.dangerModal.handlerShowModal();
  }

  deleteUser(id){
    // HERE IT'S NULL
    this._userService.deleteUserById(id)
    .subscribe(
      res => {
        this.getAllUsers();
      },
      err => {
        console.log(err);
      }
    );
    console.log('kk', id);
  }

}
