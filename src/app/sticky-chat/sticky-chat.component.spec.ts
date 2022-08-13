import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyChatComponent } from './sticky-chat.component';

describe('StickyChatComponent', () => {
  let component: StickyChatComponent;
  let fixture: ComponentFixture<StickyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
