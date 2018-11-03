import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesInsertComponent } from './categories-insert.component';

describe('CategoriesInsertComponent', () => {
  let component: CategoriesInsertComponent;
  let fixture: ComponentFixture<CategoriesInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
