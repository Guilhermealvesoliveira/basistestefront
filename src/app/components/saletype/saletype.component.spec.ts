import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletypeComponent } from './saletype.component';

describe('SaletypeComponent', () => {
  let component: SaletypeComponent;
  let fixture: ComponentFixture<SaletypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaletypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
