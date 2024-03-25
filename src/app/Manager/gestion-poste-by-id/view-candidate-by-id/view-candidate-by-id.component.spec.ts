import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateByIdComponent } from './view-candidate-by-id.component';

describe('ViewCandidateByIdComponent', () => {
  let component: ViewCandidateByIdComponent;
  let fixture: ComponentFixture<ViewCandidateByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidateByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidateByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
