'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useEditorStore } from '@/store/editorStore';
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
            'z-[80] mt-[116px] w-16 overflow-hidden p-0 shadow-none transition-all focus:border-none',
            { hidden: editor.previewMode },
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          side="right"
          className={clsx(
            'w-90 z-[80] mr-16 mt-[116px] h-full overflow-hidden bg-background p-0 shadow-none transition-all',
            { hidden: editor.previewMode },
          )}
        >
          <div className="grid h-screen gap-4 overflow-x-scroll pb-36">
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
