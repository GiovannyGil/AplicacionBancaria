import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosListComponent } from './ahorros-list.component';

describe('AhorrosListComponent', () => {
  let component: AhorrosListComponent;
  let fixture: ComponentFixture<AhorrosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorrosListComponent]
    });
    fixture = TestBed.createComponent(AhorrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
