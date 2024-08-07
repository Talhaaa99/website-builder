"use client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  BuilderProvider,
  initialTemplates,
  useBuilder,
} from '@/providers/builder-context';
import PropertiesPanel from '@/components/PropertiesPanel';

const Builder = () => {
  const {
    pages,
    setPages,
    currentPageId,
    setCurrentPageId,
    setSelectedElement,
    isPreview,
    setIsPreview,
  } = useBuilder();

  const currentPage = pages.find(
    (page: { id: string }) => page.id === currentPageId,
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || !currentPage) return;

    const reorderedElements = Array.from(currentPage.elements);
    const [removed] = reorderedElements.splice(source.index, 1);
    reorderedElements.splice(destination.index, 0, removed);

    const updatedPages = pages.map((page) =>
      page.id === currentPageId
        ? { ...page, elements: reorderedElements }
        : page,
    );

    setPages(updatedPages);
  };

  const addElement = (type: string) => {
    if (!currentPage) return;

    const newElement = {
      id: `element-${Date.now()}`,
      type,
      properties: type === 'text' ? { text: 'New Text' } : { src: '', alt: '' },
    };

    const updatedPages = pages.map((page) =>
      page.id === currentPageId
        ? { ...page, elements: [...page.elements, newElement] }
        : page,
    );

    setPages(updatedPages);
  };

  const addPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      name: `Page ${pages.length + 1}`,
      elements: [],
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
  };

  const loadTemplate = (templateId: string) => {
    const template = initialTemplates.find((t) => t.id === templateId);
    if (template) {
      setPages([template]);
      setCurrentPageId(template.id);
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="flex">
      {!isPreview && (
        <div className="w-1/4 p-4">
          <div>
            <h2 className="text-xl font-bold">Templates</h2>
            {initialTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => loadTemplate(template.id)}
                className="mt-2 block rounded bg-gray-200 p-2"
              >
                {template.name}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold">Pages</h2>
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPageId(page.id)}
                className={`block p-2 ${page.id === currentPageId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {page?.name}
              </button>
            ))}
            <button
              onClick={addPage}
              className="mt-4 rounded bg-green-500 p-2 text-white"
            >
              Add Page
            </button>
          </div>
        </div>
      )}
      <div className={`w-full p-4 ${isPreview ? '' : 'w-1/2'}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="editor">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-screen border border-dashed"
              >
                {currentPage?.elements.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setSelectedElement(element)}
                        className={`mb-2 rounded border p-4 ${isPreview ? '' : 'cursor-pointer'}`}
                      >
                        {element.type === 'text' && (
                          <div>{element.properties.text}</div>
                        )}
                        {element.type === 'image' && (
                          <img
                            src={element.properties.src}
                            alt={element.properties.alt}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {!isPreview && (
          <>
            <button
              onClick={() => addElement('text')}
              className="mt-4 rounded bg-blue-500 p-2 text-white"
            >
              Add Text
            </button>
            <button
              onClick={() => addElement('image')}
              className="mt-4 rounded bg-blue-500 p-2 text-white"
            >
              Add Image
            </button>
          </>
        )}
      </div>
      {!isPreview && <PropertiesPanel />}
      <button
        onClick={togglePreview}
        className="absolute right-4 top-4 rounded bg-purple-500 p-2 text-white"
      >
        {isPreview ? 'Exit Preview' : 'Preview'}
      </button>
    </div>
  );
};

const Home = () => (
  <BuilderProvider>
    <Builder />
  </BuilderProvider>
);

export default Home;
