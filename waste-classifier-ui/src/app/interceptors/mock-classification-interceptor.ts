import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import {WasteClassification} from '../services/onnx-inference.service';
import { delay, of } from 'rxjs';
import { inject } from '@angular/core';
import { WasteBin, WasteBinService, WasteType } from '../services/waste-bin.service';

/**
 * WILL GET REPLACED WITH REAL API CALL TO PERFORM AN ACTUAL CLASSIFICATION
 */

function getRandomWasteType(bins: readonly WasteBin[]): WasteType{
  const binIndex = Math.floor(Math.random() * bins.length);
  return bins[binIndex].type;
}

function getRandomConfidence(): number {
  const min = 0.65;
  const max = 0.98;
  return Math.random() * (max - min) + min;
}

export const mockClassificationInterceptor: HttpInterceptorFn = (req, next) => {
  const wastBinService = inject(WasteBinService);
  const bins = wastBinService.bins;
  if (req.url.includes('api/predict-image') && req.method === 'POST') {
    console.log('Mocking classification request...');
    const mockResponse: WasteClassification = {
      type: getRandomWasteType(bins),
      confidence: getRandomConfidence()
    };

    return of(new HttpResponse({ status: 200, body: mockResponse })).pipe(delay(2000));
  }
  return next(req);
};
