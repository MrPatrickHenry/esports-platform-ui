import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSubmissionComponent } from './score-submission.component';

describe('ScoreSubmissionComponent', () => {
  let component: ScoreSubmissionComponent;
  let fixture: ComponentFixture<ScoreSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
