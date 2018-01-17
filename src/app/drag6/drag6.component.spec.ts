import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drag6Component } from './drag6.component';

describe('Drag6Component', () => {
  let component: Drag6Component;
  let fixture: ComponentFixture<Drag6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drag6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drag6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
