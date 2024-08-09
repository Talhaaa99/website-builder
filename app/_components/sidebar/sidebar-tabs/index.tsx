import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, SettingsIcon, SquareStackIcon } from 'lucide-react';

const TabList = () => {
  return (
    <TabsList className="flex h-fit w-full flex-col items-center justify-evenly gap-4 bg-transparent">
      <TabsTrigger
        value="Settings"
        className="h-10 w-10 p-0 data-[state=active]:bg-muted"
      >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="h-10 w-10 p-0 data-[state=active]:bg-muted"
      >
        <Plus />
      </TabsTrigger>

      <TabsTrigger
        value="Templates"
        className="h-10 w-10 p-0 data-[state=active]:bg-muted"
      >
        <SquareStackIcon />
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
