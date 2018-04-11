import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHouseComponent } from './update-house.component';

describe('UpdateHouseComponent', () => {
  let component: UpdateHouseComponent;
  let fixture: ComponentFixture<UpdateHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
