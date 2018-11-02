import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from '../../../interfaces/users';
import { UserService } from 'src/services/user.service';
import { finalize } from 'rxjs/operators';
import { NgxViacepService } from '@brunoc/ngx-viacep'; // Importando o serviço
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
  public cepMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,  '-', /[0-9]/, /[0-9]/, /[0-9]/];
  public landlineNumberMask = ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]

  private userRequest: FormGroup;

  private selectedFile = null;

  //  firebase
  uploadPercent: Observable<number>;

  constructor(  
                private formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private userService: UserService,
                private router: Router,
                private viacep: NgxViacepService ) {
    this.userRequest = formBuilder.group({
      'name': new FormControl("", [Validators.required]),
      'email': new FormControl("", [Validators.required]),
      'birthday': new FormControl("", [Validators.required]),
      'cellPhone': new FormControl("", [Validators.required]),
      'landlineNumber': new FormControl("", [Validators.required]),
      'password': new FormControl("", [Validators.required]),
      'cpf': new FormControl("", [Validators.required]),
      'admin': new FormControl(true, [Validators.required]),
      'photo': new FormControl(null, [Validators.required]),
      'addressList': this.formBuilder.array([ this.createAddress() ])
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
    request.cellPhone = request.cellPhone.replace(/\D+/g, '');
    request.landlineNumber = request.landlineNumber.replace(/\D+/g, '');
    request.birthday = moment(request.birthday).format('YYYY-MM-DD');

    this.userService.insertUser(request)
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

}
