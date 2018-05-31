import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSafetyComponent } from './user-safety.component';

describe('UserSafetyComponent', () => {
  let component: UserSafetyComponent;
  let fixture: ComponentFixture<UserSafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
