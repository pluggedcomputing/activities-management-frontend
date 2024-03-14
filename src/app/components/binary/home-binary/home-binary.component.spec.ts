import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBinaryComponent } from './home-binary.component';

describe('HomeBinaryComponent', () => {
  let component: HomeBinaryComponent;
  let fixture: ComponentFixture<HomeBinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBinaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
