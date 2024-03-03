import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabMenuComponent } from './collab-menu.component';

describe('CollabMenuComponent', () => {
  let component: CollabMenuComponent;
  let fixture: ComponentFixture<CollabMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
