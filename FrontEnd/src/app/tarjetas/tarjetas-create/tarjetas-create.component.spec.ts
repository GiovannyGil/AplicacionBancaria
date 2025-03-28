import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasCreateComponent } from './tarjetas-create.component';

describe('TarjetasCreateComponent', () => {
  let component: TarjetasCreateComponent;
  let fixture: ComponentFixture<TarjetasCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetasCreateComponent]
    });
    fixture = TestBed.createComponent(TarjetasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
