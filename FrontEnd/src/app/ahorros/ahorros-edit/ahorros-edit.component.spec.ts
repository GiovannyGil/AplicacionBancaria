import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosEditComponent } from './ahorros-edit.component';

describe('AhorrosEditComponent', () => {
  let component: AhorrosEditComponent;
  let fixture: ComponentFixture<AhorrosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorrosEditComponent]
    });
    fixture = TestBed.createComponent(AhorrosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
