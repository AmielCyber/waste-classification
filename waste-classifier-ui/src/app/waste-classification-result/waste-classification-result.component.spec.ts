import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteClassificationResultComponent } from './waste-classification-result.component';

describe('WasteClassificationResultComponent', () => {
  let component: WasteClassificationResultComponent;
  let fixture: ComponentFixture<WasteClassificationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteClassificationResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WasteClassificationResultComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
