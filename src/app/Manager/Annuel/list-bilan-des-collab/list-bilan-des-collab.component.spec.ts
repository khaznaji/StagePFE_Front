import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBilanDesCollabComponent } from './list-bilan-des-collab.component';

describe('ListBilanDesCollabComponent', () => {
  let component: ListBilanDesCollabComponent;
  let fixture: ComponentFixture<ListBilanDesCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBilanDesCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBilanDesCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
