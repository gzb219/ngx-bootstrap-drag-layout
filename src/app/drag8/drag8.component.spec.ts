import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drag8Component } from './drag8.component';

describe('Drag8Component', () => {
  let component: Drag8Component;
  let fixture: ComponentFixture<Drag8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drag8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drag8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
