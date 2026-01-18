import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Episode } from './episode';

describe('Episode', () => {
  let component: Episode;
  let fixture: ComponentFixture<Episode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Episode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Episode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
