import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteBinComponent } from './waste-bin.component';

describe('WasteBinComponent', () => {
  let component: WasteBinComponent;
  let fixture: ComponentFixture<WasteBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteBinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WasteBinComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
