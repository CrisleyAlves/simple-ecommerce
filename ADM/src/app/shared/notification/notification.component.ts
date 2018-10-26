import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public showNotification = false;

  constructor() { }

  ngOnInit() {
  }

  handlerShowNotification(){
    this.showNotification = true;
  }

}
