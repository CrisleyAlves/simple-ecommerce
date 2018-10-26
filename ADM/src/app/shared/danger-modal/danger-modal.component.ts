import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-danger-modal',
  templateUrl: './danger-modal.component.html',
  styleUrls: ['./danger-modal.component.scss']
})
export class DangerModalComponent implements OnInit {


  @Input() data: any;
  @Input() action: any;

  public showModal = false;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
    console.log(this.action);
  }

  handlerShowModal(){
    this.showModal = true;
  }

  handerlHideModal(){
    this.showModal = false;
  }

  handlerConfirm(){
    this.action(this.data);
  }

}
