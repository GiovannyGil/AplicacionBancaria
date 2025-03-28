import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosListComponent } from './gastos-list.component';

describe('GastosListComponent', () => {
  let component: GastosListComponent;
  let fixture: ComponentFixture<GastosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastosListComponent]
    });
    fixture = TestBed.createComponent(GastosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
