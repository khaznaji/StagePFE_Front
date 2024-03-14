import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPosteCollabComponent } from './get-all-poste-collab.component';

describe('GetAllPosteCollabComponent', () => {
  let component: GetAllPosteCollabComponent;
  let fixture: ComponentFixture<GetAllPosteCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllPosteCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllPosteCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
