import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBilanByIdCollabComponent } from './get-bilan-by-id-collab.component';

describe('GetBilanByIdCollabComponent', () => {
  let component: GetBilanByIdCollabComponent;
  let fixture: ComponentFixture<GetBilanByIdCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBilanByIdCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBilanByIdCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
