import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drag7Component } from './drag7.component';

describe('Drag7Component', () => {
  let component: Drag7Component;
  let fixture: ComponentFixture<Drag7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drag7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drag7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
