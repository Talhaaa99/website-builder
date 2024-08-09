'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { DeviceTypes, useEditorStore } from '@/store/editorStore';
import clsx from 'clsx';
import {
  Download,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react';
import React from 'react';
import PageNavigationBar from '../page-nav';
import ThemeSelector from '../theme-selector';
import { exportFiles } from '@/lib/utils';

const MainNav = () => {
  /* const router = useRouter(); */
  const {
    setPreviewMode,
    toggleLiveMode,
    undo,
    redo,
    editor,
    setDevice,
    history,
  } = useEditorStore();

  /*  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    if (event.target.value === funnelPageDetails.name) return;
    if (event.target.value) {
      await upsertFunnelPage(
        subaccountId,
        {
          id: funnelPageDetails.id,
          name: event.target.value,
          order: funnelPageDetails.order,
        },
        funnelId,
      );

      toast('Success', {
        description: 'Saved Funnel Page title',
      });
      router.refresh();
    } else {
      toast('Oppse!', {
        description: 'You need to have a title!',
      });
      event.target.value = funnelPageDetails.name;
    }
  }; */

  const handlePreviewClick = () => {
    setPreviewMode(!editor.previewMode);
    toggleLiveMode(!editor.liveMode);
  };

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  /* const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements);
    try {
      const response = await upsertFunnelPage(
        subaccountId,
        {
          ...funnelPageDetails,
          content,
        },
        funnelId,
      );
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subaccountId: subaccountId,
      });
      toast('Success', {
        description: 'Saved Editor',
      });
    } catch (error) {
      toast('Oppse!', {
        description: 'Could not save editor',
      });
    }
  }; */

  return (
    <TooltipProvider>
      <nav
        className={clsx(
          'flex items-center justify-between gap-2 border-b-[1px] p-4 transition-all',
          { '!h-0 !overflow-hidden !p-0': editor.previewMode },
        )}
      >
        {/* <aside className="flex w-[300px] max-w-[260px] items-center gap-4">
          <Link href={`/subaccount/${subaccountId}/funnels/${funnelId}`}>
            <ArrowLeftCircle />
          </Link>
          <div className="flex w-full flex-col">
            <Input
              defaultValue={funnelPageDetails.name}
              className="m-0 h-5 border-none p-0 text-lg"
              onBlur={handleOnBlurTitleChange}
            />
            <span className="text-sm text-muted-foreground">
              Path: /{funnelPageDetails.pathName}
            </span>
          </div>
        </aside> */}
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={editor.device}
            onValueChange={(value) => {
              setDevice(value as DeviceTypes);
            }}
          >
            <TabsList className="grid h-fit w-full grid-cols-3 bg-transparent">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside>
          <PageNavigationBar />
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-slate-800 dark:text-white"
            onClick={handlePreviewClick}
          >
            <EyeIcon />
          </Button>
          <Button
            disabled={!(history.currentIndex > 0)}
            onClick={handleUndo}
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-slate-200 dark:text-white"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={!(history.currentIndex < history.history.length - 1)}
            onClick={handleRedo}
            variant={'ghost'}
            size={'icon'}
            className="mr-4 hover:bg-slate-200 dark:text-white"
          >
            <Redo2 />
          </Button>
          <Button
            onClick={exportFiles}
            variant={'ghost'}
            size={'icon'}
            className="mr-4 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800"
          >
            <Download />
          </Button>
          <ThemeSelector />
        </aside>
      </nav>
    </TooltipProvider>
  );
};

export default MainNav;
