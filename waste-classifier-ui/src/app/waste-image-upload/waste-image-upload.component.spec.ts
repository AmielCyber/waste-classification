import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteImageUploadComponent } from './waste-image-upload.component';

describe('WasteImageUploadComponent', () => {
  let component: WasteImageUploadComponent;
  let fixture: ComponentFixture<WasteImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteImageUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WasteImageUploadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
