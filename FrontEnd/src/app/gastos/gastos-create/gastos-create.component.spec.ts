import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosCreateComponent } from './gastos-create.component';

describe('GastosCreateComponent', () => {
  let component: GastosCreateComponent;
  let fixture: ComponentFixture<GastosCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastosCreateComponent]
    });
    fixture = TestBed.createComponent(GastosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
