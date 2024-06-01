import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleNotificationComponent } from './role-notification.component';

describe('RoleNotificationComponent', () => {
  let component: RoleNotificationComponent;
  let fixture: ComponentFixture<RoleNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
