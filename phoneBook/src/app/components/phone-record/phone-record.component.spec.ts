import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRecordComponent } from './phone-record.component';

describe('PhoneRecordComponent', () => {
  let component: PhoneRecordComponent;
  let fixture: ComponentFixture<PhoneRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
