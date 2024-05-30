import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteArchiveByIdComponent } from './poste-archive-by-id.component';

describe('PosteArchiveByIdComponent', () => {
  let component: PosteArchiveByIdComponent;
  let fixture: ComponentFixture<PosteArchiveByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosteArchiveByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosteArchiveByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
