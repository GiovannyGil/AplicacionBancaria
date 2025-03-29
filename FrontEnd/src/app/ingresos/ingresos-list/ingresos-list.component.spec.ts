import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosListComponent } from './ingresos-list.component';

describe('IngresosListComponent', () => {
  let component: IngresosListComponent;
  let fixture: ComponentFixture<IngresosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresosListComponent]
    });
    fixture = TestBed.createComponent(IngresosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
