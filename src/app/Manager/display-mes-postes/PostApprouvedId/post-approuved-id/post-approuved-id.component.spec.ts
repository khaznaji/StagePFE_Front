import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostApprouvedIdComponent } from './post-approuved-id.component';

describe('PostApprouvedIdComponent', () => {
  let component: PostApprouvedIdComponent;
  let fixture: ComponentFixture<PostApprouvedIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostApprouvedIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostApprouvedIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
