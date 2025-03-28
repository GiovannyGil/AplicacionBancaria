import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasListComponent } from './tarjetas-list.component';

describe('TarjetasListComponent', () => {
  let component: TarjetasListComponent;
  let fixture: ComponentFixture<TarjetasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetasListComponent]
    });
    fixture = TestBed.createComponent(TarjetasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
