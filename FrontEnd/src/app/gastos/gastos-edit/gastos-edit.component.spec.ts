import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosEditComponent } from './gastos-edit.component';

describe('GastosEditComponent', () => {
  let component: GastosEditComponent;
  let fixture: ComponentFixture<GastosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastosEditComponent]
    });
    fixture = TestBed.createComponent(GastosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
