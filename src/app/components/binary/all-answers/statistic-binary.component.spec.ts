import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBinaryComponent } from './statistic-binary.component';

describe('StatisticBinaryComponent', () => {
  let component: StatisticBinaryComponent;
  let fixture: ComponentFixture<StatisticBinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticBinaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticBinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
