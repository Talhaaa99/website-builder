import { create } from 'zustand';

interface Element {
  id: string;
  type: string;
  properties: { [key: string]: any };
}

interface Page {
  id: string;
  name: string;
  elements: Element[];
}

interface BuilderState {
  pages: Page[];
  currentPageId: string;
  selectedElement: Element | null;
  isPreview: boolean;
  setPages: (pages: Page[]) => void;
  setCurrentPageId: (id: string) => void;
  setSelectedElement: (element: Element | null) => void;
  setIsPreview: (isPreview: boolean) => void;
  addPage: () => void;
  addElement: (type: string) => void;
  updateElementProperty: (id: string, property: string, value: any) => void;
  loadTemplate: (template: Page[]) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  pages: [{ id: 'page-1', name: 'Home', elements: [] }],
  currentPageId: 'page-1',
  selectedElement: null,
  isPreview: false,
  setPages: (pages) => set({ pages }),
  setCurrentPageId: (id) => set({ currentPageId: id }),
  setSelectedElement: (element) => set({ selectedElement: element }),
  setIsPreview: (isPreview) => set({ isPreview }),
  addPage: () =>
    set((state) => ({
      pages: [
        ...state.pages,
        { id: `page-${Date.now()}`, name: 'New Page', elements: [] },
      ],
      currentPageId: `page-${Date.now()}`,
    })),
  addElement: (type) =>
    set((state) => {
      const newElement = {
        id: `element-${Date.now()}`,
        type,
        properties:
          type === 'text' ? { text: 'New Text' } : { src: '', alt: '' },
      };
      return {
        pages: state.pages.map((page) =>
          page.id === state.currentPageId
            ? { ...page, elements: [...page.elements, newElement] }
            : page,
        ),
      };
    }),
  updateElementProperty: (id, property, value) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        elements: page.elements.map((element) =>
          element.id === id
            ? {
                ...element,
                properties: { ...element.properties, [property]: value },
              }
            : element,
        ),
      })),
    })),
  loadTemplate: (template) =>
    set(() => ({ pages: template, currentPageId: template[0].id })),
}));
