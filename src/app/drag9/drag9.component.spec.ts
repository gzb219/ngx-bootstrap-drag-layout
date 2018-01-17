import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drag9Component } from './drag9.component';

describe('Drag9Component', () => {
  let component: Drag9Component;
  let fixture: ComponentFixture<Drag9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drag9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drag9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
