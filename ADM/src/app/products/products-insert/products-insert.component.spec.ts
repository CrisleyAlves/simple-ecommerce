import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInsertComponent } from './products-insert.component';

describe('ProductsInsertComponent', () => {
  let component: ProductsInsertComponent;
  let fixture: ComponentFixture<ProductsInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
