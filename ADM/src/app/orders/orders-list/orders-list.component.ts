import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { OrderService } from 'src/services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  public dateMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  public orders: any;

  private filterRequest: FormGroup;

  constructor(formBuilder: FormBuilder, private _orderService: OrderService) {
    this.filterRequest = formBuilder.group({
      'cpf': new FormControl(''),
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      'status': new FormControl('0')
    });
   }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders(){
    this._orderService.getOrders().subscribe( (res) =>{
      this.orders = res.content
    })
  }

  applyFilter(request){

    request.cpf = request.cpf.replace(/\D+/g, '');

    console.log(request);

    if(request.cpf.length > 0 || request.status != 0 || (request.startDate.length === 10 && request.endDate.length === 10)){
      this._orderService.filter(request).subscribe(data => this.orders = data.body);
    }else{
      this.getAllOrders();
    }
  }

}
