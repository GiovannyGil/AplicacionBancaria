import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosCreateComponent } from './ahorros-create.component';

describe('AhorrosCreateComponent', () => {
  let component: AhorrosCreateComponent;
  let fixture: ComponentFixture<AhorrosCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorrosCreateComponent]
    });
    fixture = TestBed.createComponent(AhorrosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
