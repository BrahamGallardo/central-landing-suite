import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastBootstrapComponent } from './toast-bootstrap.component';

describe('ToastBootstrapComponent', () => {
  let component: ToastBootstrapComponent;
  let fixture: ComponentFixture<ToastBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastBootstrapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
