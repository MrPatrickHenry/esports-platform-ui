import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTitlesComponent } from './titles.component';

describe('TitlesComponent', () => {
  let component: AdminTitlesComponent;
  let fixture: ComponentFixture<AdminTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
