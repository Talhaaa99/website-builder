'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useEditorStore } from '@/zustand/editorStore';
import { Button } from '@/components/ui/button';

const TemplatesTab = () => {
  const { loadTemplate, saveAsTemplate } = useEditorStore();

  const handleLoadTemplate = (templateId: string) => {
    loadTemplate(templateId);
  };

  const handleSaveTemplate = () => {
    saveAsTemplate();
  };

  return (
    <Accordion type="multiple" className="w-full" defaultValue={['Templates']}>
      <AccordionItem value="Templates" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Templates</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleSaveTemplate}
              variant="secondary"
              className="w-full"
            >
              Save Current Template
            </Button>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Available Templates</p>
              <Button
                onClick={() => handleLoadTemplate('portfolio-template')}
                variant="secondary"
              >
                Portfolio Template
              </Button>
              <Button
                onClick={() => handleLoadTemplate('blog-template')}
                variant="secondary"
              >
                Blog Template
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TemplatesTab;
