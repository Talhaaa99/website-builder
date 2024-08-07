  // src/models/Element.ts
  export interface BuilderElement {
    id: string;
    type: 'text' | 'image' | 'video' | 'button';
    // ...other properties based on element type
  }
  