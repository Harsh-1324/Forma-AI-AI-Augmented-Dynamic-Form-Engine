import React, { useState } from 'react';
import BuilderSidebar from '../components/BuilderSidebar';
import BuilderCanvas from '../components/BuilderCanvas';
import PropertyPanel from '../components/PropertyPanel';
import { generateSchema } from '../utils/schemaGenerator';
import { formTemplates } from '../data/templates';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import FormPreview from '../components/Preview/FormPreview';

const FormBuilderPage = () => {
  const [fields, setFields] = useState([]);
  const [activeFieldId, setActiveFieldId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [jsonSchema, setJsonSchema] = useState('');
  const [activeDragField, setActiveDragField] = useState(null);
  const [activeSortId, setActiveSortId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    if (String(active.id).startsWith('sidebar-')) {
      setActiveDragField(active.data.current?.field);
    } else {
      setActiveSortId(active.id);
    }
  };

  const handleDragEnd = (event) => {
    setActiveDragField(null);
    setActiveSortId(null);
    const { active, over } = event;
    
    if (!over) return;

    const isSidebarItem = String(active.id).startsWith('sidebar-');

    if (isSidebarItem) {
      const fieldData = active.data.current?.field;
      if (fieldData) {
        const newField = {
          ...fieldData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };

        if (over.id === 'canvas-droppable') {
          setFields([...fields, newField]);
        } else {
          const overIndex = fields.findIndex(f => f.id === over.id);
          if (overIndex !== -1) {
            const newFields = [...fields];
            newFields.splice(overIndex, 0, newField);
            setFields(newFields);
          } else {
            setFields([...fields, newField]);
          }
        }
      }
    } else {
      if (active.id !== over.id) {
        const oldIndex = fields.findIndex(f => f.id === active.id);
        const newIndex = fields.findIndex(f => f.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          setFields(arrayMove(fields, oldIndex, newIndex));
        }
      }
    }
  };

  const handleAddField = (fieldConfig) => {
    const newField = {
      ...fieldConfig,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setFields([...fields, newField]);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter(f => f.id !== id));
    if (activeFieldId === id) {
      setActiveFieldId(null);
    }
  };

  const handleDuplicateField = (id) => {
    const fieldIndex = fields.findIndex(f => f.id === id);
    if (fieldIndex !== -1) {
      const duplicatedField = {
        ...fields[fieldIndex],
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      const newFields = [...fields];
      newFields.splice(fieldIndex + 1, 0, duplicatedField);
      setFields(newFields);
    }
  };

  const handleEditField = (id) => {
    setActiveFieldId(id);
  };

  const handleUpdateField = (updatedField) => {
    setFields(fields.map(f => f.id === updatedField.id ? updatedField : f));
  };

  const handleGenerateJSON = () => {
    const schema = generateSchema("Untitled Form", "A dynamically generated form", fields);
    setJsonSchema(JSON.stringify(schema, null, 2));
    setIsModalOpen(true);
  };

  const handleLoadTemplate = (templateId) => {
    if (!templateId) return;
    const template = formTemplates.find(t => t.id === templateId);
    if (template) {
      const templateFields = template.fields.map(f => ({
        ...f,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));
      setFields(templateFields);
      setActiveFieldId(null);
    }
  };

  const activeField = fields.find(f => f.id === activeFieldId) || null;

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', background: '#f7f8fa' }}>
        {/* Top Header */}
      <header style={{ 
        height: '60px', 
        background: '#fff', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Admin Form Builder</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select 
            onChange={(e) => {
              handleLoadTemplate(e.target.value);
              e.target.value = ""; // Reset after selection
            }} 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
          >
            <option value="">Load Template...</option>
            {formTemplates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <div style={{ width: '1px', height: '24px', background: '#e5e7eb', margin: '0 4px' }}></div>
          <button onClick={() => setIsPreviewOpen(true)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>Preview</button>
          <button onClick={handleGenerateJSON} style={{ padding: '8px 16px', background: '#e5e7eb', color: '#1a1a1a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Generate JSON</button>
          <button style={{ padding: '8px 16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save Form</button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar (Field Library) */}
        <aside style={{ width: '280px', background: '#fff', borderRight: '1px solid #e5e7eb', overflowY: 'auto', flexShrink: 0 }}>
          <BuilderSidebar onAddField={handleAddField} />
        </aside>

        {/* Center Canvas */}
        <main style={{ flexGrow: 1, overflowY: 'auto' }}>
          <BuilderCanvas 
            fields={fields} 
            onDelete={handleDeleteField}
            onDuplicate={handleDuplicateField}
            onEdit={handleEditField}
            activeFieldId={activeFieldId}
          />
        </main>

        {/* Right Property Panel */}
        <aside style={{ width: '300px', background: '#fff', borderLeft: '1px solid #e5e7eb', overflowY: 'auto', flexShrink: 0 }}>
          <PropertyPanel activeField={activeField} onUpdateField={handleUpdateField} />
        </aside>

      </div>

      {/* JSON Schema Modal */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 50 
        }}>
          <div style={{ 
            background: '#fff', padding: '24px', borderRadius: '8px', 
            width: '600px', maxWidth: '90%', maxHeight: '80vh', 
            display: 'flex', flexDirection: 'column' 
          }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Generated JSON Schema</h2>
            <pre style={{ 
              background: '#f3f4f6', padding: '16px', borderRadius: '6px', 
              overflow: 'auto', flexGrow: 1, fontSize: '13px', border: '1px solid #e5e7eb',
              margin: 0
            }}>
              {jsonSchema}
            </pre>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ padding: '8px 16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 50 
        }}>
          <div style={{ 
            background: '#fff', padding: '0', borderRadius: '8px', 
            width: '800px', maxWidth: '90%', maxHeight: '90vh', 
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Live Form Preview</h2>
              <button onClick={() => setIsPreviewOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>×</button>
            </div>
            <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1, background: '#f7f8fa' }}>
              <FormPreview fields={fields} />
            </div>
          </div>
        </div>
      )}
      </div>
    </DndContext>
  );
};

export default FormBuilderPage;
