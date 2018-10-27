import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductService } from 'src/services/products.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/interfaces/products';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-products-insert',
  templateUrl: './products-insert.component.html',
  styleUrls: ['./products-insert.component.scss']
})
export class ProductsInsertComponent implements OnInit {

  private productRequest: FormGroup;
  private selectedFile = null;

  public showNotification = false;

  //  firebase
  uploadPercent: Observable<number>;

  constructor(  formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private productService: ProductService,
                private router: Router) {
    this.productRequest = formBuilder.group({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'stock': new FormControl(null, [Validators.required]),
      'photo': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {}

  onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.productRequest.patchValue({
        "photo": new Date() + this.selectedFile.name
      });
  }

  submitForm(request: IProduct) {

    const task = this.storage.upload("products/"+request.photo, this.selectedFile);

    this.uploadPercent = task.percentageChanges();

    // uploading file
    task.snapshotChanges().pipe(
        //if comes here, the file was uploaded

        //call function responsable for saving the data on the bd
        finalize(() => this.insertProduct(request) )
     )
    .subscribe()
  }

  insertProduct(request){

    this.productService.insertProduct(request)
    .subscribe(
      res => {
        // console.log(res);
        this.showNotification = true;
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      },
      err => {
        // console.log(err);
      }
    );
  }


}
