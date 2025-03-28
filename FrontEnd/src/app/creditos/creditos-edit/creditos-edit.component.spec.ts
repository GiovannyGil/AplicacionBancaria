import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosEditComponent } from './creditos-edit.component';

describe('CreditosEditComponent', () => {
  let component: CreditosEditComponent;
  let fixture: ComponentFixture<CreditosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditosEditComponent]
    });
    fixture = TestBed.createComponent(CreditosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
