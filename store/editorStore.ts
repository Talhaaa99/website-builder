import { create } from 'zustand';
import { EditorBtns } from '@/lib/constants';

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet';

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content:
    | EditorElement[]
    | { href?: string; innerText?: string; src?: string };
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  html: string;
  css: string;
  js: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type Page = {
  id: string;
  name: string;
  elements: EditorElement[];
};

export type Templates = {
  id: string;
  name: string;
  pages: Page[];
  elements: EditorElement[];
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
  theme: 'light' | 'dark'; // Theme can only be 'light' or 'dark'
  setTheme: (theme: 'light' | 'dark') => void;
  setDevice: (device: DeviceTypes) => void;
  setPreviewMode: (previewMode: boolean) => void;
  addElement: (elementDetails: EditorElement, containerId: string) => void;
  updateElement: (elementDetails: EditorElement) => void;
  deleteElement: (elementId: string) => void;
  changeClickedElement: (elementDetails: EditorElement) => void;
  toggleLiveMode: (value?: boolean) => void;
  redo: () => void;
  undo: () => void;
  loadData: (elements: EditorElement[], withLive?: boolean) => void;
  pages: Page[];
  currentPageId: string;
  addPage: (name: string) => void;
  removePage: (id: string) => void;
  setCurrentPage: (id: string) => void;
  exportProject: () => { html: string; css: string; js: string };
};

const initialEditorState: EditorState['editor'] = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    id: '',
    content: [],
    name: '',
    styles: {},
    type: null,
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  html: '',
  css: '',
  js: '',
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialTemplates = [
  {
    id: 'template-1',
    name: 'Portfolio',
    pages: [{ id: 'page-1', name: 'Home', elements: [] }],
  },
  {
    id: 'template-2',
    name: 'Blog',
    pages: [{ id: 'page-1', name: 'Home', elements: [] }],
  },
];

export const useEditorStore = create<EditorState>((set, get) => ({
  editor: initialEditorState,
  history: initialHistoryState,
  theme: 'dark', // or 'light'
  setTheme: (theme) => set(() => ({ theme })),
  setDevice: (device) =>
    set((state) => ({
      editor: { ...state.editor, device },
    })),

  setPreviewMode: (previewMode) =>
    set((state) => ({
      editor: { ...state.editor, previewMode },
    })),

  addElement: (elementDetails, containerId) =>
    set((state) => {
      const addAnElement = (
        editorArray: EditorElement[],
        elementDetails: EditorElement,
        containerId: string,
      ): EditorElement[] => {
        return editorArray.map((item) => {
          if (item.id === containerId && Array.isArray(item.content)) {
            return {
              ...item,
              content: [...item.content, elementDetails],
            };
          } else if (item.content && Array.isArray(item.content)) {
            return {
              ...item,
              content: addAnElement(item.content, elementDetails, containerId),
            };
          }
          return item;
        });
      };

      const updatedElements = addAnElement(
        state.editor.elements,
        elementDetails,
        containerId,
      );

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...state.editor, elements: updatedElements },
      ];

      return {
        editor: { ...state.editor, elements: updatedElements },
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };
    }),

  updateElement: (elementDetails) =>
    set((state) => {
      const updateAnElement = (
        editorArray: EditorElement[],
        elementDetails: EditorElement,
      ): EditorElement[] => {
        return editorArray.map((item) => {
          if (item.id === elementDetails.id) {
            return { ...item, ...elementDetails };
          } else if (item.content && Array.isArray(item.content)) {
            return {
              ...item,
              content: updateAnElement(item.content, elementDetails),
            };
          }
          return item;
        });
      };

      const updatedElements = updateAnElement(
        state.editor.elements,
        elementDetails,
      );

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...state.editor, elements: updatedElements },
      ];

      return {
        editor: {
          ...state.editor,
          elements: updatedElements,
          selectedElement:
            state.editor.selectedElement.id === elementDetails.id
              ? elementDetails
              : {
                  id: '',
                  content: [],
                  name: '',
                  styles: {},
                  type: null,
                },
        },
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };
    }),

  deleteElement: (elementId) =>
    set((state) => {
      const deleteAnElement = (
        editorArray: EditorElement[],
        elementId: string,
      ): EditorElement[] => {
        return editorArray.filter((item) => {
          if (item.id === elementId) {
            return false;
          } else if (item.content && Array.isArray(item.content)) {
            item.content = deleteAnElement(item.content, elementId);
          }
          return true;
        });
      };

      const updatedElements = deleteAnElement(state.editor.elements, elementId);

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...state.editor, elements: updatedElements },
      ];

      return {
        editor: { ...state.editor, elements: updatedElements },
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };
    }),

  changeClickedElement: (elementDetails) =>
    set((state) => {
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...state.editor, selectedElement: elementDetails },
      ];

      return {
        editor: {
          ...state.editor,
          selectedElement: elementDetails,
        },
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };
    }),

  toggleLiveMode: (value) =>
    set((state) => ({
      editor: {
        ...state.editor,
        liveMode: value !== undefined ? value : !state.editor.liveMode,
      },
    })),

  redo: () =>
    set((state) => {
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        return {
          editor: { ...state.history.history[nextIndex] },
          history: { ...state.history, currentIndex: nextIndex },
        };
      }
      return state;
    }),

  undo: () =>
    set((state) => {
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        return {
          editor: { ...state.history.history[prevIndex] },
          history: { ...state.history, currentIndex: prevIndex },
        };
      }
      return state;
    }),

  loadData: (elements, withLive) =>
    set(() => ({
      editor: {
        ...initialEditorState,
        elements: elements || initialEditorState.elements,
        liveMode: !!withLive,
      },
      history: {
        history: [initialEditorState],
        currentIndex: 0,
      },
    })),
  pages: [
    {
      id: 'page-1',
      name: 'Home',
      elements: [],
    },
  ],
  currentPageId: 'page-1',
  addPage: (name) =>
    set((state) => ({
      pages: [
        ...state.pages,
        { id: `page-${state.pages.length + 1}`, name, elements: [] },
      ],
    })),
  removePage: (id) =>
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
    })),
  setCurrentPage: (id) => set(() => ({ currentPageId: id })),
  loadTemplate: (templateId: string) =>
    set((state) => {
      const template = initialTemplates.find((t) => t.id === templateId);
      if (template) {
        return {
          pages: template.pages,
          currentPageId: template.pages[0].id,
        };
      } else {
        console.warn(`Template with id ${templateId} not found`);
        return {};
      }
    }),
  saveAsTemplate: () => {
    const { pages } = get();
    const newTemplate = {
      id: `template-${new Date().getTime()}`,
      name: 'Custom Template',
      pages,
    };
    const existingTemplates = JSON.parse(
      localStorage.getItem('templates') || '[]',
    );

    // Add the new template to the existing templates
    const updatedTemplates = [...existingTemplates, newTemplate];

    // Save the updated templates array back to local storage
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));

    console.log('Template saved successfully:', newTemplate);
  },
  exportProject: () => {
    const { html, css, js } = get().editor; // Example: get the current HTML, CSS, and JS state
    return { html, css, js };
  },
}));
