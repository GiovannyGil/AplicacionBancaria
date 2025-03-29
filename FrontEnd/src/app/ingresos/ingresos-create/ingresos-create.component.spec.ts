import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosCreateComponent } from './ingresos-create.component';

describe('IngresosCreateComponent', () => {
  let component: IngresosCreateComponent;
  let fixture: ComponentFixture<IngresosCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresosCreateComponent]
    });
    fixture = TestBed.createComponent(IngresosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
