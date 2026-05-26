import { Injectable, signal } from '@angular/core';

export interface WasteBin {
  type: string;
  color: string;
}

const initial_bins: WasteBin[] = [
  { type: 'Cardboard', color: '#6c3900' },
  { type: 'Food', color: '#1c6a00' },
  { type: 'Glass', color: '#1cc2b4' },
  { type: 'Metal', color: '#9ca3ad' },
  { type: 'Misc.', color: '#2c3644' },
  { type: 'Paper', color: '#0055cd' },
  { type: 'Plastic', color: '#1cc4ff' },
  { type: 'Textile', color: '#BE185D' },
  { type: 'Vegetation', color: '#5cc605' },
];

@Injectable({
  providedIn: 'root',
})
export class WasteBinService {
  private readonly _bins = signal<WasteBin[]>(initial_bins);
  readonly bins = this._bins.asReadonly();
  readonly binSelected = signal<WasteBin | null>(null);
}
