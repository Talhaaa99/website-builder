"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BuilderElement {
    id: string;
    type: string;
    properties: {
      [key: string]: any;
    };
  }

interface Page {
  id: string;
  name: string;
  elements: BuilderElement[];
}

interface BuilderContextProps {
    pages: Array<Page>;
    setPages: React.Dispatch<React.SetStateAction<Array<Page>>>;
    currentPageId: string;
    setCurrentPageId: React.Dispatch<React.SetStateAction<string>>
    selectedElement: BuilderElement | null;
    setSelectedElement: React.Dispatch<React.SetStateAction<BuilderElement | null>>;
    isPreview: boolean;
    setIsPreview: (isPreview: boolean) => void;
  }

const BuilderContext = createContext<BuilderContextProps | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Array<Page>>([]);
  const [selectedElement, setSelectedElement] = useState<BuilderElement | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string>('');
  const [isPreview, setIsPreview] = useState<boolean>(false);

  return (
    <BuilderContext.Provider value={{ pages, setPages, currentPageId, setCurrentPageId, selectedElement, setSelectedElement, isPreview, setIsPreview }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = (): BuilderContextProps => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export const initialTemplates: Page[] = [
    {
      id: 'template-1',
      name: 'Template 1',
      elements: [
        { id: 'element-1', type: 'text', properties: { text: 'Welcome to Template 1' } },
        { id: 'element-2', type: 'image', properties: { src: '/path/to/image.jpg', alt: 'Template Image' } },
      ],
    },
    {
      id: 'template-2',
      name: 'Template 2',
      elements: [
        { id: 'element-1', type: 'text', properties: { text: 'Welcome to Template 2' } },
        { id: 'element-2', type: 'image', properties: { src: '/path/to/image2.jpg', alt: 'Template Image' } },
      ],
    },
  ];
  
