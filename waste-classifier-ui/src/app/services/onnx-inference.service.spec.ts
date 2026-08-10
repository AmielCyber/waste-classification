import { TestBed } from '@angular/core/testing';

import { OnnxInferenceService } from './onnx-inference.service';

describe('OnnxInferenceService', () => {
  let service: OnnxInferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnnxInferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
