import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTypebookpriceComponent } from './sale-typebookprice.component';

describe('SaleTypebookpriceComponent', () => {
  let component: SaleTypebookpriceComponent;
  let fixture: ComponentFixture<SaleTypebookpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleTypebookpriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleTypebookpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
