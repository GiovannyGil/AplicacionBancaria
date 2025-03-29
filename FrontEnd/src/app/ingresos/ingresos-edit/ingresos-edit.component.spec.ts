import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosEditComponent } from './ingresos-edit.component';

describe('IngresosEditComponent', () => {
  let component: IngresosEditComponent;
  let fixture: ComponentFixture<IngresosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresosEditComponent]
    });
    fixture = TestBed.createComponent(IngresosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
