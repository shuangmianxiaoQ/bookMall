import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnacceptedOrderComponent } from './unaccepted-order.component';

describe('UnacceptedOrderComponent', () => {
  let component: UnacceptedOrderComponent;
  let fixture: ComponentFixture<UnacceptedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnacceptedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnacceptedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
