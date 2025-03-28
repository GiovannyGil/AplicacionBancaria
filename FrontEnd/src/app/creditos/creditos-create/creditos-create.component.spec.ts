import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosCreateComponent } from './creditos-create.component';

describe('CreditosCreateComponent', () => {
  let component: CreditosCreateComponent;
  let fixture: ComponentFixture<CreditosCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditosCreateComponent]
    });
    fixture = TestBed.createComponent(CreditosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
