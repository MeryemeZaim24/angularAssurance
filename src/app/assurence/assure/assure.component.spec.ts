import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssureComponent } from './assure.component';

describe('AssureComponent', () => {
  let component: AssureComponent;
  let fixture: ComponentFixture<AssureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssureComponent]
    });
    fixture = TestBed.createComponent(AssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
