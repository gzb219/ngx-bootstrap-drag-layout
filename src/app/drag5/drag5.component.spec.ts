import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drag5Component } from './drag5.component';

describe('Drag5Component', () => {
  let component: Drag5Component;
  let fixture: ComponentFixture<Drag5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drag5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drag5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
