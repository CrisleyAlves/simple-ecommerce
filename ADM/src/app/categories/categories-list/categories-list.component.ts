import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CategoryService } from 'src/services/category.service';
import { ICategory } from 'src/interfaces/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  public categories: any;

  private filterRequest: FormGroup;

  constructor(
            formBuilder: FormBuilder, 
            private _categoryService: CategoryService) {
    this.filterRequest = formBuilder.group({
      'description': new FormControl('')
    });
   }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._categoryService.getAllCategories().subscribe( (res) => {
      this.categories = res.content
    }
      
    );
  }

  applyFilter(request: ICategory){
    if(request.description.length > 0){
      this._categoryService.filter(request).subscribe(data => this.categories = data.body);
    }else{
      this.getAllCategories();
    }    
  }

  deleteCategory(id){
    this._categoryService.deleteCategoryById(id)
    .subscribe(
      res => {
        this.getAllCategories();
      },
      err => {
        console.log(err);
      }
    );
  }

}
