import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MespostulationsComponent } from './mespostulations.component';

describe('MespostulationsComponent', () => {
  let component: MespostulationsComponent;
  let fixture: ComponentFixture<MespostulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MespostulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MespostulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
