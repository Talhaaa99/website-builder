import { BuilderElement } from './Element';

// src/models/Page.ts
export interface Page {
  id: string;
  title: string;
  elements: Element[];
}
