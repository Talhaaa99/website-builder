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
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
} from 'lucide-react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useEditorStore } from '@/zustand/editorStore'; // Adjust the path accordingly

const SettingsTab = () => {
  const { editor, updateElement } = useEditorStore();

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    const value = e.target.value;
    const styleObject = {
      ...editor.selectedElement,
      styles: {
        ...editor.selectedElement.styles,
        [styleSettings]: value,
      },
    };

    updateElement(styleObject);
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    const value = e.target.value;
    const contentObject = {
      ...editor.selectedElement,
      content: {
        ...editor.selectedElement.content,
        [settingProperty]: value,
      },
    };

    updateElement(contentObject);
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Typography', 'Dimensions', 'Decorations', 'Flexbox']}
    >
      <AccordionItem value="Custom" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {editor.selectedElement.type === 'link' &&
            !Array.isArray(editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https:domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={editor.selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="border-y-[1px] px-6 py-0">
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Text Align</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'textAlign',
                    value: e,
                  },
                })
              }
              value={editor.selectedElement.styles.textAlign}
            >
              <TabsList className="flex h-fit flex-row items-center justify-between gap-4 rounded-md border-[1px] bg-transparent">
                <TabsTrigger
                  value="left"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Input
              id="fontFamily"
              onChange={handleOnChanges}
              value={editor.selectedElement.styles.fontFamily}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <Input
              id="color"
              onChange={handleOnChanges}
              value={editor.selectedElement.styles.color}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: 'fontWeight',
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={editor.selectedElement.styles.fontSize}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.height}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input
                      placeholder="px"
                      id="width"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.width}
                    />
                  </div>
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      id="marginTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.marginTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      id="marginBottom"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.marginBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      id="marginLeft"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.marginLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      id="marginRight"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.marginRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      id="paddingTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.paddingTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      id="paddingBottom"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.paddingBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      id="paddingLeft"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.paddingLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      id="paddingRight"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selectedElement.styles.paddingRight}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Opacity</Label>
          <Slider
            max={100}
            min={0}
            step={1}
            id="opacity"
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: 'opacity',
                  value: e,
                },
              })
            }
            value={[Number(editor.selectedElement.styles.opacity)]}
          />
          <Label className="text-muted-foreground">Radius</Label>
          <Input
            id="borderRadius"
            placeholder="px"
            onChange={handleOnChanges}
            value={editor.selectedElement.styles.borderRadius}
          />
          <Label className="text-muted-foreground">Background Color</Label>
          <Input
            type="color"
            id="backgroundColor"
            onChange={handleOnChanges}
            value={editor.selectedElement.styles.backgroundColor}
          />
          <Label className="text-muted-foreground">Background Image</Label>
          <Input
            id="backgroundImage"
            placeholder="url"
            onChange={handleOnChanges}
            value={editor.selectedElement.styles.backgroundImage}
          />
          <Label className="text-muted-foreground">Background Size</Label>
          <Select
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: 'backgroundSize',
                  value: e,
                },
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Background Sizes</SelectLabel>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Align</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'alignItems',
                    value: e,
                  },
                })
              }
              value={editor.selectedElement.styles.alignItems}
            >
              <TabsList className="flex h-fit flex-row items-center justify-between gap-4 rounded-md border-[1px] bg-transparent">
                <TabsTrigger
                  value="flex-start"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyStart size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="flex-end"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalJustifyEndIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="space-between"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalSpaceBetween size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="space-around"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalSpaceAround size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="stretch"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Justify</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'justifyContent',
                    value: e,
                  },
                })
              }
              value={editor.selectedElement.styles.justifyContent}
            >
              <TabsList className="flex h-fit flex-row items-center justify-between gap-4 rounded-md border-[1px] bg-transparent">
                <TabsTrigger
                  value="flex-start"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalJustifyStart size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalJustifyCenterIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="flex-end"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalJustifyEndIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="space-between"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalSpaceBetween size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="space-around"
                  className="h-10 w-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalSpaceAround size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Flex Direction</Label>
            <Select
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'flexDirection',
                    value: e,
                  },
                })
              }
              value={editor.selectedElement.styles.flexDirection}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Flex Directions</SelectLabel>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                  <SelectItem value="row-reverse">Row Reverse</SelectItem>
                  <SelectItem value="column-reverse">Column Reverse</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Gap</Label>
            <Input
              id="gap"
              placeholder="px"
              onChange={handleOnChanges}
              value={editor.selectedElement.styles.gap}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsTab;
