import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCertificatsComponent } from './get-certificats.component';

describe('GetCertificatsComponent', () => {
  let component: GetCertificatsComponent;
  let fixture: ComponentFixture<GetCertificatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCertificatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCertificatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
