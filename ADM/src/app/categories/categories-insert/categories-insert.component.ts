import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/services/category.service';
import { Router } from '@angular/router';
import { ICategory } from 'src/interfaces/category';

@Component({
  selector: 'app-categories-insert',
  templateUrl: './categories-insert.component.html',
  styleUrls: ['./categories-insert.component.scss']
})
export class CategoriesInsertComponent implements OnInit {

  private categoryRequest: FormGroup;

  constructor(  formBuilder: FormBuilder,
                private _categoryService: CategoryService,
                private router: Router) {
    this.categoryRequest = formBuilder.group({
      'id': new FormControl( { value: '', disabled: true }),
      'description': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {}

  submitForm(request: ICategory) {
    this._categoryService.insertCategory(request)
    .subscribe(
      res => {
        // console.log(res);
        this.router.navigate(['/categories']);
      },
      err => {
        // console.log(err);
      });
  }

}
