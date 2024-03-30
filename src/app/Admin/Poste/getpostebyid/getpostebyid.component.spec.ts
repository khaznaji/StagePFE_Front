import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetpostebyidComponent } from './getpostebyid.component';

describe('GetpostebyidComponent', () => {
  let component: GetpostebyidComponent;
  let fixture: ComponentFixture<GetpostebyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetpostebyidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetpostebyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
