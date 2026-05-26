import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinGridComponent } from './bin-grid.component';

describe('BinGridComponent', () => {
  let component: BinGridComponent;
  let fixture: ComponentFixture<BinGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BinGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
