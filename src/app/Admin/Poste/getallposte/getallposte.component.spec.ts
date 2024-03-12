import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallposteComponent } from './getallposte.component';

describe('GetallposteComponent', () => {
  let component: GetallposteComponent;
  let fixture: ComponentFixture<GetallposteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallposteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallposteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
