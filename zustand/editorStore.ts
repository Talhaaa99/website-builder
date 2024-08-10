import { create } from 'zustand';
import {
  EditorBtns,
  initialTemplates,
  updateElementsRecursive,
} from '@/lib/constants';
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
  id: string;
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement | null;
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
  elements: Editor[];
};

export type Templates = {
  id: string;
  name: string;
  pages: Page[];
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  setDevice: (device: DeviceTypes) => void;
  setPreviewMode: (previewMode: boolean) => void;
  addElement: (elementDetails: EditorElement, containerId: string) => void;
  deleteElement: (elementId: string) => void;
  changeClickedElement: (elementDetails: EditorElement) => void;
  toggleLiveMode: (value?: boolean) => void;
  redo: () => void;
  undo: () => void;
  loadData: (elements: EditorElement[], pageId?: string) => void;
  pages: Page[];
  currentPageId: string;
  addPage: (name: string) => void;
  removePage: (id: string) => void;
  setCurrentPage: (id: string) => void;
  exportProject: () => { html: string; css: string; js: string };
  loadTemplate: (templateId: string) => void;
  saveAsTemplate: () => void;
  updateElement: (updatedElement: Partial<EditorElement>) => void;
  updateElementInPage: (element: EditorElement) => void;
};

const initialEditorState: EditorState['editor'] = {
  id: v4(),
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: null,
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
  theme: 'dark',
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
          const updatedEditors = page.elements.map((editor) => {
            const updatedElements = editor.elements.map((el) => {
              if (el.id === containerId && el.type === '__body') {
                // Append the new element to the existing content array
                const newContent = [
                  ...(el.content as EditorElement[]),
                  { ...elementDetails },
                ];
                return { ...el, content: newContent };
              }
              return el;
            });

            return {
              ...editor,
              elements: updatedElements, // Return the updated editor with new elements
            };
          });

          return {
            ...page,
            elements: updatedEditors, // Update the page with the modified editor
          };
        }
        return page;
      });

      return { pages: updatedPages };
    });
  },

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
          const updatedEditors = page.elements.map((editor) => {
            const updatedElements = deleteRecursive(editor.elements);
            return {
              ...editor,
              elements: updatedElements,
            };
          });

          return { ...page, elements: updatedEditors };
        }
        return page;
      });

      return { pages: updatedPages };
    }),

  changeClickedElement: (element: EditorElement) => {
    set((state) => ({
      editor: {
        ...state.editor,
        selectedElement: element,
      },
    }));
  },

  updateElement: (updatedElement: Partial<EditorElement>) => {
    const state = get();
    const selectedElement = state.editor.selectedElement;

    if (!selectedElement) return;

    const updatedSelectedElement = {
      ...selectedElement,
      ...updatedElement,
    };

    set({
      editor: {
        ...state.editor,
        selectedElement: updatedSelectedElement,
      },
    });

    get().updateElementInPage(updatedSelectedElement);
  },

  updateElementInPage: (updatedElement: EditorElement) => {
    const state = get();
    const updatedPages = state.pages.map((page) => {
      if (page.id === state.currentPageId) {
        const updatedEditors = page.elements.map((editor) => {
          const updatedElements = updateElementsRecursive(
            editor.elements,
            updatedElement,
          );

          return {
            ...editor,
            elements: updatedElements,
          };
        });

        return {
          ...page,
          elements: updatedEditors,
        };
      }
      return page;
    });

    set({ pages: updatedPages });
  },

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

  loadData: (elements, pageId) => {
    set((state) => {
      const pageIndex = state.pages.findIndex(
        (page) => page.id === (pageId || state.currentPageId),
      );
      if (pageIndex > -1) {
        const newPages = [...state.pages];
        newPages[pageIndex].elements = [
          {
            ...newPages[pageIndex].elements[0],
            elements,
          },
        ];

        return {
          pages: newPages,
        };
      }
      return {};
    });
  },

  pages: [
    {
      id: 'page-1',
      name: 'Home',
      elements: [
        {
          id: v4(),
          elements: [
            {
              id: '__body',
              type: '__body',
              styles: {},
              content: [],
              name: 'Body',
            },
          ],
          liveMode: false,
          selectedElement: null,
          device: 'Desktop',
          previewMode: false,
          html: '',
          css: '',
          js: '',
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
            elements: [
              {
                id: '__body',
                type: '__body',
                styles: {},
                content: [],
                name: 'Body',
              },
            ],
            liveMode: false,
            selectedElement: null,
            device: 'Desktop',
            previewMode: false,
            html: '',
            css: '',
            js: '',
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
        return {
          pages: template.pages.map((page) => ({
            id: page.id,
            name: page.name,
            elements: page.elements.map((editor) => ({
              ...editor,
              elements: editor.elements.map((element) => ({
                ...element,
                content: Array.isArray(element.content)
                  ? element.content.map((contentElement) => ({
                      ...contentElement,
                    }))
                  : element.content,
              })),
            })),
          })),
          currentPageId: template.pages[0].id,
        };
      } else {
        console.warn(`Template with id ${templateId} not found`);
        return state;
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

      const updatedTemplates = [...existingTemplates, newTemplate];

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
