import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadesComponent } from './arcades.component';

describe('ArcadesComponent', () => {
  let component: ArcadesComponent;
  let fixture: ComponentFixture<ArcadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
