import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurMenuComponent } from './formateur-menu.component';

describe('FormateurMenuComponent', () => {
  let component: FormateurMenuComponent;
  let fixture: ComponentFixture<FormateurMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateurMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
