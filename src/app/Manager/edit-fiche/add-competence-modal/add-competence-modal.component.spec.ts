import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenceModalComponent } from './add-competence-modal.component';

describe('AddCompetenceModalComponent', () => {
  let component: AddCompetenceModalComponent;
  let fixture: ComponentFixture<AddCompetenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompetenceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompetenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
