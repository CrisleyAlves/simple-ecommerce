import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/interfaces/category';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  private categoryRequest: FormGroup;

  constructor(  formBuilder: FormBuilder,
                private _categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) {
    this.categoryRequest = formBuilder.group({
      'id': new FormControl( { value: '', disabled: true }),
      'description': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this._categoryService.getCategoryById(this.route.snapshot.params['id']).subscribe((data) => {
      if(data.body === null){
          this.router.navigate(['/categories']);
      }else{
          this.categoryRequest.patchValue(data.body);
      }
    });
  }

  submitForm(request: ICategory) {
    this._categoryService.updateCategory(request)
    .subscribe(
      res => {
        this.router.navigate(['/categories']);
      },
      err => {
        
      });
  }

}
