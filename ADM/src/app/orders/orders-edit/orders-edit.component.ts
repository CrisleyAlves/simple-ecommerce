import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { OrderService } from 'src/services/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss']
})
export class OrdersEditComponent implements OnInit {

  private orderRequest: FormGroup;

  public showNotification = false;

  constructor(  formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private _orderService: OrderService,
                private router: Router,
                private route: ActivatedRoute) {
    this.orderRequest = formBuilder.group({
      'id': new FormControl( { value: '', disabled: true}, [Validators.required]),
      'date': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'formPayment': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'totalPrice': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'cep': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'address': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'additionalAddress': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'city': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'neightborhood': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'user': formBuilder.group({
        'id': [{ value: '', disabled: true }],
        'name': [{ value: '', disabled: true }],
        'email': [{ value: '', disabled: true }],
        'cellphone': [{ value: '', disabled: true }]
      }),
      'orderItemList': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this._orderService.getOrderById(this.route.snapshot.params['id']).subscribe((data) => {
      if(data.body === null){
          this.router.navigate(['/orders']);
      }else{
          this.orderRequest.patchValue(data.body);

          this.orderRequest.controls.date.setValue(
            moment(this.orderRequest.controls.date.value).format("YYYY-MM-DD")
          );

          this.orderRequest.controls.orderItemList.value.map((item) => {
            const photo = this.storage.ref('products/'+item.product.photo.toString());
            photo.getDownloadURL().subscribe((res) => {
              item.product.photo = res;
            });
          });
          // const ref = this.storage.ref('products/'+this.orderRequest.controls['photo'].value);
          // this.productUrl = ref.getDownloadURL();
      }
    });
  }

  submitForm(request) {
    this._orderService.updatetOrder(request)
    .subscribe(
      res => {
        this.showNotification = true;
        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 2000);
      },
      err => {
        // console.log(err);
      }
    );
  }

}
