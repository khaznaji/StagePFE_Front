import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGroupsOfFormateurComponent } from './details-groups-of-formateur.component';

describe('DetailsGroupsOfFormateurComponent', () => {
  let component: DetailsGroupsOfFormateurComponent;
  let fixture: ComponentFixture<DetailsGroupsOfFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGroupsOfFormateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGroupsOfFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
