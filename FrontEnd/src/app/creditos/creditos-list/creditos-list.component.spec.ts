import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosListComponent } from './creditos-list.component';

describe('CreditosListComponent', () => {
  let component: CreditosListComponent;
  let fixture: ComponentFixture<CreditosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditosListComponent]
    });
    fixture = TestBed.createComponent(CreditosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
