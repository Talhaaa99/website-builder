import { create } from 'zustand';
import { EditorBtns, initialTemplates } from '@/lib/constants';
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
  loadTemplate: (templateId: string) => void;
  saveAsTemplate: () => void;
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

export const useEditorStore = create<EditorState>((set, get) => ({
  editor: initialEditorState,
  history: {
    history: [initialEditorState],
    currentIndex: 0,
  },
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

  addElement: (elementDetails: EditorElement, containerId: string) => {
    set((state) => {
      const updatedPages = state.pages.map((page) => {
        if (page.id === state.currentPageId) {
          const updatedElements = page.elements.map((el) => {
            if (el.id === containerId && el.type === '__body') {
              // Only update the content of the existing __body component
              const newContent = [
                ...(el.content as EditorElement[]),
                { ...elementDetails },
              ];
              return { ...el, content: newContent };
            }
            return el;
          });

          return { ...page, elements: updatedElements };
        }
        return page;
      });

      return { pages: updatedPages };
    });
  },

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

  deleteElement: (elementId: string) =>
    set((state) => {
      const deleteRecursive = (elements: EditorElement[]): EditorElement[] => {
        return elements
          .filter((el) => el.id !== elementId)
          .map((el) => ({
            ...el,
            content: Array.isArray(el.content)
              ? deleteRecursive(el.content as EditorElement[])
              : el.content,
          }));
      };

      const updatedPages = state.pages.map((page) => {
        if (page.id === state.currentPageId) {
          const updatedElements = deleteRecursive(page.elements);
          return { ...page, elements: updatedElements };
        }
        return page;
      });

      console.log('Updated elements after deletion: ', updatedPages);

      return { pages: updatedPages };
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
      console.log('Loading data:', elements);

      // Temporarily disable filtering to see if elements reappear
      const validElements = elements; // Remove the filter temporarily

      const pageIndex = state.pages.findIndex(
        (page) => page.id === (pageId || state.currentPageId),
      );
      if (pageIndex > -1) {
        const newPages = [...state.pages];
        newPages[pageIndex].elements = validElements;

        console.log('After loading data, updated pages:', newPages);
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
          id: '__body',
          type: '__body',
          styles: {},
          content: [], // Start with an empty array
          name: 'body',
        },
      ],
    },
  ],
  currentPageId: 'page-1',
  addPage: (name: string) =>
    set((state) => {
      const newPage: Page = {
        id: `page-${state.pages.length + 1}`,
        name,
        elements: [
          {
            id: v4(),
            name: 'Body',
            type: '__body',
            styles: {},
            content: [],
          },
        ],
      };

      return {
        pages: [...state.pages, newPage],
        currentPageId: newPage.id,
      };
    }),
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
        // Ensure that pages and currentPageId are updated
        return {
          ...state,
          pages: template.pages, // Setting the template's pages to the store
          currentPageId: template.pages[0].id, // Set the currentPageId to the first page
        };
      } else {
        console.warn(`Template with id ${templateId} not found`);
        return {}; // Return the current state if the template isn't found
      }
    }),

  saveAsTemplate: () => {
    try {
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
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  },

  exportProject: () => {
    const { html, css, js } = get().editor;
    return { html, css, js };
  },
}));
