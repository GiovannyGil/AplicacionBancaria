import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasEditComponent } from './tarjetas-edit.component';

describe('TarjetasEditComponent', () => {
  let component: TarjetasEditComponent;
  let fixture: ComponentFixture<TarjetasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetasEditComponent]
    });
    fixture = TestBed.createComponent(TarjetasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
