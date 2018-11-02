import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from '../../../interfaces/users';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import * as moment from 'moment';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  public birthdayMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public cellPhoneMask = ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public cepMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,  '-', /[0-9]/, /[0-9]/, /[0-9]/];
  public landlineNumberMask = ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]

  private userRequest: FormGroup;

  private wishListReadOnly: any;

  //  firebase
  uploadPercent: Observable<number>;

  constructor(  
                private formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private viacep: NgxViacepService ) {
    this.userRequest = formBuilder.group({
      'id': new FormControl({value: '', disabled: true}, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required]),
      'cellPhone': new FormControl(null, [Validators.required]),
      'landlineNumber': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'cpf': new FormControl(null, [Validators.required]),
      'admin': new FormControl(null, [Validators.required]),
      'addressList': this.formBuilder.array([ ]),
      'wishList': this.formBuilder.array([ ])
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe((response) => {
      if(response.body === null){
          this.router.navigate(['/users']);
      }else{
          
        for(var i = 0;i < response.body.addressList.length; i++){
            const address = this.createAddress();
            this.addressList.push(address);
          }

          for(var i = 0;i < response.body.wishList.length; i++){
            const wish = this.createWish();
            this.wishList.push(wish);
          }

          this.wishListReadOnly = response.body.wishList;

          this.userRequest.patchValue(response.body);
          
      }
    });
  }

  submitForm(request: IUser) {
    request.cpf = request.cpf.replace(/\D+/g, '');
    request.cellPhone = request.cellPhone.replace(/\D+/g, '');
    request.landlineNumber = request.landlineNumber.replace(/\D+/g, '');
    request.birthday = moment(request.birthday).format('YYYY-MM-DD');

    this.userService.updateUser(request)
    .subscribe(
      res => {
        this.router.navigate(['/users']);
      },
      err => {
        // console.log(err);
      }
    );
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      'cep': ['', Validators.required],
      'address': ['', Validators.required],
      'additionalAddress': ['', Validators.required],
      'neighborhood': ['', Validators.required],
      'city': ['', Validators.required],
      'uf': ['', Validators.required]
    });
  }

  get addressList(): FormArray{
    return this.userRequest.get("addressList") as FormArray;
  }

  addNewAddress(){        
    const address = this.createAddress();
    this.addressList.push(address);
  }

  removeAddress(i){
    this.addressList.removeAt(i);
  }

  findByCep(i){
    var cep = this.addressList.controls[i].value.cep;

    this.viacep.buscarPorCep(cep).then((res) => {
      this.addressList.controls[i].patchValue({ city: res.localidade });
      this.addressList.controls[i].patchValue({ address: res.logradouro });
      this.addressList.controls[i].patchValue({ uf: res.uf });
      this.addressList.controls[i].patchValue({ neighborhood: res.bairro });
    });;
  }
  
  //Just added to register in the form the wishList, if I don't register it, the data will be removed after update
  get wishList(): FormArray{
    return this.userRequest.get("wishList") as FormArray;
  }

  //Just added to register in the form the wishList, if I don't register it, the data will be removed after update
  createWish(): FormGroup {
    return this.formBuilder.group({
      'id': ['', Validators.required],
      'product': ['', Validators.required],
      'date_added': ['', Validators.required],
      'user': ['', Validators.required]
    });
  }

  //Just added to register in the form the wishList, if I don't register it, the data will be removed
  addWish(){        
    const wish = this.createWish();
    this.wishList.push(wish);
  }
  
}
