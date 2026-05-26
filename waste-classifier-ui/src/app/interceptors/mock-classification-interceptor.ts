import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { ClassificationResult } from '../services/image-classification.service';
import { delay, of } from 'rxjs';

export const mockClassificationInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api/predict-image') && req.method === 'POST') {
    console.log('Mocking classification request...');
    const mockResponse: ClassificationResult = { type: 'Metal', confidence: 0.69 };

    return of(new HttpResponse({ status: 200, body: mockResponse })).pipe(delay(2000));
  }
  return next(req);
};
