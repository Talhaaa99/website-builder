"use client";
import React from 'react';
import { useBuilder } from '@/providers/builder-context';

const PropertiesPanel: React.FC = () => {
  const {
    pages,
    setPages,
    currentPageId,
    selectedElement,
    setSelectedElement,
  } = useBuilder();

  if (!selectedElement) {
    return <div className="p-4">Select an element to edit its properties.</div>;
  }

  const currentPage = pages.find((page) => page.id === currentPageId);

  const updateElementProperty = (property: string, value: string) => {
    if (!currentPage) return;

    const updatedElements = currentPage.elements.map((element) =>
      element.id === selectedElement.id
        ? {
            ...element,
            properties: { ...element.properties, [property]: value },
          }
        : element,
    );

    const updatedPages = pages.map((page) =>
      page.id === currentPageId ? { ...page, elements: updatedElements } : page,
    );

    setPages(updatedPages);

    // Ensure the correct typing for the updater function
    setSelectedElement((prev) => {
      if (!prev) return prev; // Ensure prev is of type Element or null
      return { ...prev, properties: { ...prev.properties, [property]: value } };
    });
  };

  return (
    <div className="border-l p-4">
      <h2 className="text-xl font-bold">Properties</h2>
      {Object.keys(selectedElement.properties).map((property) => (
        <div key={property} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {property}
          </label>
          <input
            type="text"
            value={selectedElement.properties[property]}
            onChange={(e) => updateElementProperty(property, e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default PropertiesPanel;
