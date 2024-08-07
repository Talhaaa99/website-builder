'use client';
import React from 'react';
import { useBuilderStore } from '@/store/builderStore';

const PropertiesPanel: React.FC = () => {
  const { selectedElement, updateElementProperty } = useBuilderStore();

  if (!selectedElement) {
    return <div className="p-4">Select an element to edit its properties.</div>;
  }

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
            onChange={(e) =>
              updateElementProperty(
                selectedElement.id,
                property,
                e.target.value,
              )
            }
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default PropertiesPanel;
