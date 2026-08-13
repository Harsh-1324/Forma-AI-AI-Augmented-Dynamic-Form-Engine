import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Settings } from "lucide-react";

// Draggable Sidebar Item Component
function DraggableFieldType({ type, label }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${type}`,
    data: { type, label },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: 100,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 mb-2 rounded-lg border border-stone-800 bg-stone-900/50 hover:bg-stone-800 text-stone-300 cursor-grab active:cursor-grabbing text-sm font-medium transition-colors"
    >
      {label}
    </div>
  );
}

// Droppable Canvas Workspace Component
function DroppableCanvas({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "builder-canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] p-6 rounded-xl border border-dashed transition-all ${
        isOver
          ? "border-indigo-500 bg-indigo-950/10"
          : "border-stone-800 bg-stone-950/20"
      }`}
    >
      {children}
    </div>
  );
}

export default function FormBuilderPage() {
  const [formName, setFormName] = useState("New Custom Claim Form");
  const [formDescription, setFormDescription] = useState("Explain the incident below.");
  
  // List of fields on the builder canvas
  const [fields, setFields] = useState([
    {
      id: "init-1",
      key: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      aiExtractable: true,
    },
  ]);

  // Track currently active field for the settings panel
  const [editingFieldId, setEditingFieldId] = useState(null);

  // Available field types to drag
  const fieldTypes = [
    { type: "text", label: "Text Field" },
    { type: "number", label: "Number Input" },
    { type: "dropdown", label: "Dropdown Select" },
    { type: "checkbox", label: "Checkbox Option" },
    { type: "textarea", label: "Paragraph Box" },
  ];

  // Handle drag end event
  function handleDragEnd(event) {
    const { active, over } = event;

    // Added to canvas
    if (over && over.id === "builder-canvas") {
      const draggedData = active.data.current;
      if (!draggedData) return;

      const newField = {
        id: `field-${Date.now()}`,
        key: `${draggedData.type}_${Date.now().toString().slice(-4)}`,
        label: `New ${draggedData.label}`,
        type: draggedData.type,
        required: false,
        aiExtractable: true,
      };

      setFields((prev) => [...prev, newField]);
      setEditingFieldId(newField.id);
    }
  }

  // Remove field from canvas
  function deleteField(id) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (editingFieldId === id) setEditingFieldId(null);
  }

  // Update properties of a field
  function updateFieldProperty(id, property, value) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [property]: value } : f))
    );
  }

  const selectedField = fields.find((f) => f.id === editingFieldId);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="max-w-5xl mx-auto p-4">
        {/* Top Header metadata editor */}
        <div className="mb-6 p-4 rounded-xl border border-stone-800 bg-stone-950/20 backdrop-blur-md">
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full text-2xl font-bold bg-transparent border-none text-white focus:outline-none mb-1"
            placeholder="Form Title"
          />
          <input
            type="text"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full text-sm bg-transparent border-none text-stone-400 focus:outline-none"
            placeholder="Describe what this form is used for"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column: Draggable field panel */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Field toolbox
            </h3>
            <div className="p-4 rounded-xl border border-stone-800 bg-stone-950/20 backdrop-blur-md">
              <p className="text-xs text-stone-400 mb-4 leading-normal">
                Drag a field type onto the canvas workspace to add it.
              </p>
              {fieldTypes.map((ft) => (
                <DraggableFieldType key={ft.type} type={ft.type} label={ft.label} />
              ))}
            </div>
          </div>

          {/* Center Column: Droppable workspace canvas */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Canvas workspace
            </h3>
            <DroppableCanvas>
              {fields.map((field) => (
                <div
                  key={field.id}
                  onClick={() => setEditingFieldId(field.id)}
                  className={`flex items-center justify-between p-4 mb-3 rounded-lg border transition-all cursor-pointer ${
                    editingFieldId === field.id
                      ? "border-indigo-500 bg-indigo-950/10"
                      : "border-stone-800 bg-stone-900/30 hover:border-stone-700"
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{field.label}</div>
                    <div className="text-xs text-stone-400">
                      Key: <code className="text-indigo-400">{field.key}</code> • Type:{" "}
                      <span className="capitalize">{field.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteField(field.id);
                      }}
                      className="text-stone-400 hover:text-red-400"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {fields.length === 0 && (
                <div className="text-center py-12 text-stone-500 text-sm">
                  Drag fields here to start building.
                </div>
              )}
            </DroppableCanvas>
          </div>

          {/* Right Column: Properties editor panel */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Field properties
            </h3>
            <div className="p-4 rounded-xl border border-stone-800 bg-stone-950/20 backdrop-blur-md min-h-[300px]">
              {selectedField ? (
                <div>
                  <div className="mb-4">
                    <label className="block text-xs text-stone-400 mb-1">Field Label</label>
                    <input
                      type="text"
                      value={selectedField.label}
                      onChange={(e) => updateFieldProperty(selectedField.id, "label", e.target.value)}
                      className="w-full text-sm bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs text-stone-400 mb-1">Database Key</label>
                    <input
                      type="text"
                      value={selectedField.key}
                      onChange={(e) => updateFieldProperty(selectedField.id, "key", e.target.value)}
                      className="w-full text-sm bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-stone-400">Required Field</span>
                    <input
                      type="checkbox"
                      checked={selectedField.required}
                      onChange={(e) => updateFieldProperty(selectedField.id, "required", e.target.checked)}
                      className="size-4 accent-indigo-500 rounded border-stone-800 bg-stone-900"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-stone-400">AI Extractable</span>
                    <input
                      type="checkbox"
                      checked={selectedField.aiExtractable}
                      onChange={(e) => updateFieldProperty(selectedField.id, "aiExtractable", e.target.checked)}
                      className="size-4 accent-indigo-500 rounded border-stone-800 bg-stone-900"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-stone-500 text-xs text-center py-12">
                  Select a field to configure its settings.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
