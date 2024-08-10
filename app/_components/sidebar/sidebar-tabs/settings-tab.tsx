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
/* import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs'; */

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
    updateElement({
      content: { ...selectedElement?.content, [id]: value },
    });
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
      {/* Custom settings for links */}
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

      {/* Typography settings */}
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
            {/* Additional typography settings as needed */}
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Similar settings sections for containers, videos, etc. */}
      {/* You can create more accordions for each type of element and show relevant settings */}
    </Accordion>
  );
};

export default SettingsTab;
