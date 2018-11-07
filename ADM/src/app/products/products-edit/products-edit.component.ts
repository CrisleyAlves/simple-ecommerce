import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductService } from 'src/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/interfaces/products';
import { finalize } from 'rxjs/operators';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {

  private productRequest: FormGroup;
  private selectedFile = null;

  public currentImageWillBeDeleted = false;

  categories: any;

  //  firebase
  uploadPercent: Observable<number>;

  //  current product image
  productUrl: Observable<string | null>;

  constructor(  private formBuilder: FormBuilder,
                private storage: AngularFireStorage,
                private _categoryService: CategoryService,
                private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) {
    this.productRequest = formBuilder.group({
      'id': new FormControl({ value: '', disabled: true}, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'stock': new FormControl(null, [Validators.required]),
      'photo': new FormControl(null, [Validators.required]),
      'category': formBuilder.group({
        'id': ''
      }),
    });
  }

  ngOnInit() {
    this.productService.getProductById(this.route.snapshot.params['id']).subscribe((data) => {
      if(data.body === null){
          this.router.navigate(['/products']);
      }else{
          this.productRequest.patchValue(data.body);
          this.productUrl = this.productRequest.controls['photo'].value;
      }
    });

    this._categoryService.getAllCategories().subscribe((res) => {  
      this.categories = res.content;
    })

  }

  onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.productRequest.patchValue({
        "photo": new Date() + this.selectedFile.name
      });
      this.currentImageWillBeDeleted = true;
  }

  submitForm(request: IProduct) {
    if(this.currentImageWillBeDeleted){
      this.submitWithUpload(request);
    }else{
      this.updateProduct(request);
    }
  }

  //Upload the new image to firebase and update the data on the database
  submitWithUpload(request){
    const task = this.storage.upload("products/"+request.photo, this.selectedFile);

    this.uploadPercent = task.percentageChanges();

    // uploading file
    task.snapshotChanges().pipe(
        //if comes here, the file was uploaded

        //call function responsable for saving the data on the bd
        finalize(() => {
          const ref = this.storage.ref('products/'+request.photo);            
            ref.getDownloadURL().subscribe((res) => {
              request.photo = res;
              this.updateProduct(request);
            });
        }
     ))
    .subscribe()
  }

  // Just update the data on the database
  updateProduct(request){

    this.productService.updatetProduct(request)
    .subscribe(
      res => {
        // console.log(res);
        this.router.navigate(['/products']);
      },
      err => {
        // console.log(err);
      }
    );
  }
  
}
