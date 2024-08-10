'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditorStore } from '@/zustand/editorStore';

const SettingsTab = () => {
  const { editor, updateElement } = useEditorStore();
  const { selectedElement } = editor;

  const handleOnChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    updateElement({ styles: { [id]: value } });
  };

  const handleCustomPropertyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = e.target;
    updateElement({ content: { ...selectedElement?.content, [id]: value } });
  };

  if (!selectedElement) {
    return <div>Select an element to see its settings</div>;
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Typography', 'Dimensions', 'Decorations', 'Flexbox']}
    >
      {/* Link settings */}
      {selectedElement.type === 'link' && (
        <AccordionItem value="Custom" className="px-6 py-0">
          <AccordionTrigger className="!no-underline">
            Link Settings
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Link URL</Label>
              <Input
                id="href"
                placeholder="https://example.com"
                onChange={handleCustomPropertyChange}
                value={(selectedElement.content as { href: string }).href || ''}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Text settings */}
      {selectedElement.type === 'text' && (
        <AccordionItem value="Typography" className="border-y-[1px] px-6 py-0">
          <AccordionTrigger className="!no-underline">
            Typography
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Font Size</Label>
              <Input
                id="fontSize"
                onChange={handleOnChanges}
                value={selectedElement.styles.fontSize || ''}
                placeholder="e.g., 16px"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Color</Label>
              <Input
                id="color"
                onChange={handleOnChanges}
                value={selectedElement.styles.color || ''}
                placeholder="e.g., #000000"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Video settings */}
      {selectedElement.type === 'video' && (
        <AccordionItem value="Video" className="px-6 py-0">
          <AccordionTrigger className="!no-underline">
            Video Settings
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Video URL</Label>
              <Input
                id="src"
                placeholder="https://example.com/video.mp4"
                onChange={handleCustomPropertyChange}
                value={(selectedElement.content as { src: string }).src || ''}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Container settings */}
      {selectedElement.type === 'container' && (
        <AccordionItem value="Container" className="px-6 py-0">
          <AccordionTrigger className="!no-underline">
            Container Settings
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Background Color</Label>
              <Input
                id="backgroundColor"
                placeholder="e.g., #ffffff"
                onChange={handleOnChanges}
                value={selectedElement.styles.backgroundColor || ''}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Padding</Label>
              <Input
                id="padding"
                placeholder="e.g., 20px"
                onChange={handleOnChanges}
                value={selectedElement.styles.padding || ''}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Add similar settings for 2Col, etc. */}
    </Accordion>
  );
};

export default SettingsTab;
