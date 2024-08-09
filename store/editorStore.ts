import { create } from 'zustand';
import { EditorBtns } from '@/lib/constants';
import { v4 } from 'uuid';

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet';

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns | string;
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

  addElement: (elementDetails: EditorElement, containerId: string) =>
    set((state) => {
      const updatedPages = state.pages.map((page) => {
        if (page.id === state.currentPageId) {
          const updatedElements = page.elements.map((el) => {
            if (el.id === containerId) {
              const newContent = [
                ...(el.content as EditorElement[]),
                elementDetails,
              ];
              console.log('Adding new element: ', elementDetails);
              return { ...el, content: newContent };
            }
            return el;
          });
          return { ...page, elements: updatedElements };
        }
        return page;
      });

      console.log('Updated pages after adding element: ', updatedPages);

      return { pages: updatedPages };
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
      console.log('Current elements before deletion: ', state.editor.elements);
      console.log('Attempting to delete element with id: ', elementId);

      const deleteAnElement = (
        editorArray: EditorElement[],
        elementId: string,
      ): EditorElement[] => {
        return editorArray.reduce((acc: EditorElement[], item) => {
          if (item.id === elementId) {
            console.log(`Deleting element with id: ${item.id}`);
            return acc; // Exclude this element from the new array
          } else if (item.content && Array.isArray(item.content)) {
            // Recursively delete the element from nested content
            const updatedContent = deleteAnElement(item.content, elementId);
            acc.push({ ...item, content: updatedContent });
          } else {
            // No match, so keep the element
            acc.push(item);
          }
          return acc;
        }, []);
      };

      const updatedElements = deleteAnElement(state.editor.elements, elementId);

      console.log('Updated elements after deletion: ', updatedElements);

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

  loadData: (elements, pageId) =>
    set((state) => {
      const pageIndex = state.pages.findIndex(
        (page) => page.id === (pageId || state.currentPageId),
      );
      if (pageIndex > -1) {
        const newPages = [...state.pages];
        newPages[pageIndex].elements = elements;
        return {
          pages: newPages,
        };
      }
      return {};
    }),
  pages: [
    {
      id: 'page-1',
      name: 'Home',
      elements: [
        {
          id: v4(),
          type: '__body',
          styles: {},
          content: [initialEditorState],
          name: 'body',
        },
      ],
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
    set((state) => {
      const newPages = state.pages.filter((page) => page.id !== id);
      const newCurrentPageId =
        state.currentPageId === id && newPages.length > 0
          ? newPages[0].id
          : newPages.length > 0
            ? newPages[0].id
            : undefined;
      return {
        pages: newPages,
        currentPageId: newCurrentPageId,
      };
    }),
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
