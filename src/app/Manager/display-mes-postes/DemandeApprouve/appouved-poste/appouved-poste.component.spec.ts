import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppouvedPosteComponent } from './appouved-poste.component';

describe('AppouvedPosteComponent', () => {
  let component: AppouvedPosteComponent;
  let fixture: ComponentFixture<AppouvedPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppouvedPosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppouvedPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
