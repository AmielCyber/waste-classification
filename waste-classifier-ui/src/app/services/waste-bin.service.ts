import { Injectable, signal } from '@angular/core';

export type WasteType =
  | 'Cardboard'
  | 'Food Organics'
  | 'Glass'
  | 'Metal'
  | 'Miscellaneous Trash'
  | 'Paper'
  | 'Plastic'
  | 'Textile Trash'
  | 'Vegetation';

export interface WasteBin {
  type: WasteType;
  display_text: string;
  color: string;
}

const wasteBins: WasteBin[] = [
  { type: 'Cardboard', display_text: 'Cardboard', color: '#6c3900' },
  { type: 'Food Organics', display_text: 'Food', color: '#1c6a00' },
  { type: 'Glass', display_text: 'Glass', color: '#1cc2b4' },
  { type: 'Metal', display_text: 'Metal', color: '#9ca3ad' },
  { type: 'Miscellaneous Trash', display_text: 'Misc.', color: '#2c3644' },
  { type: 'Paper', display_text: 'Paper', color: '#0055cd' },
  { type: 'Plastic', display_text: 'Plastic', color: '#1cc4ff' },
  { type: 'Textile Trash', display_text: 'Textile', color: '#BE185D' },
  { type: 'Vegetation', display_text: 'Vegetation', color: '#5cc605' },
];

@Injectable({
  providedIn: 'root',
})
export class WasteBinService {
  readonly bins = Object.freeze(wasteBins);
}
