import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Indicador1Component } from './indicador1.component';

describe('Indicador1Component', () => {
  let component: Indicador1Component;
  let fixture: ComponentFixture<Indicador1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Indicador1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Indicador1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
