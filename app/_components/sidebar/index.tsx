'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useEditorStore } from '@/zustand/editorStore';
import clsx from 'clsx';
import React from 'react';
import TabList from './sidebar-tabs';
import SettingsTab from './sidebar-tabs/settings-tab';
import ComponentsTab from './sidebar-tabs/element-tabs';

const Sidebar = () => {
  const { editor } = useEditorStore();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        <SheetContent
          side="right"
          className={clsx(
            'z-[80] mt-[97px] w-16 overflow-hidden p-0 shadow-none transition-all focus:border-none',
            { hidden: editor.previewMode },
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          side="right"
          className={clsx(
            'z-[40] mr-16 mt-[97px] h-full w-80 overflow-hidden bg-background p-0 shadow-none transition-all',
            { hidden: editor.previewMode },
          )}
        >
          <div className="grid h-full gap-4 overflow-scroll pb-36">
            <TabsContent value="Settings">
              <SheetHeader className="p-6 text-left">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>Customizable Components</SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="p-6 text-left">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  Drag these components onto your website
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default Sidebar;
