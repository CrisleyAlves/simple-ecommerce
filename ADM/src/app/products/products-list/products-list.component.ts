import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/services/products.service';
import { IProduct } from 'src/interfaces/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public products: any;
  public productToDelete = null;

  private filterRequest: FormGroup;

  constructor(formBuilder: FormBuilder, private _productService: ProductService, private changeDetector : ChangeDetectorRef) {
    this.filterRequest = formBuilder.group({
      'name': new FormControl(''),
      'stock': new FormControl('0')
    });
   }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this._productService.getProducts().subscribe(data => this.products = data);
  }

  applyFilter(request: IProduct){
    if(request.name.length > 0 || request.stock.length > 0){
      this._productService.filter(request).subscribe(data => this.products = data.body);
    }else{
      this.getAllProducts();
    }
    
  }

  deleteUserConfirm(userId){
    this.productToDelete = userId;
    this.changeDetector.detectChanges(); // parent couldn't see the child component 'cause of the *ngIf in the html, it detects the changes
  }

  deleteProduct(id){
    this._productService.deleteProductById(id)
    .subscribe(
      res => {
        this.getAllProducts();
      },
      err => {
        console.log(err);
      }
    );
  }

}
