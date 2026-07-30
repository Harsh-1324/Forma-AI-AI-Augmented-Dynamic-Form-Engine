import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CanvasFieldItem = ({ field, onDelete, onDuplicate, onEdit, isActive }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
    data: { field }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    padding: '16px', 
    marginBottom: '12px', 
    border: isActive ? '2px solid #2563eb' : '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };

  return (
    <div ref={setNodeRef} style={style} className="card" onClick={() => onEdit(field.id)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab', color: '#9ca3af', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
          ⋮⋮
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{field.label}</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.type}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={(e) => { e.stopPropagation(); onEdit(field.id); }} style={{ padding: '6px 12px', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px' }}>Edit</button>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(field.id); }} style={{ padding: '6px 12px', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px' }}>Duplicate</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(field.id); }} style={{ padding: '6px 12px', cursor: 'pointer', background: '#fee2e2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '4px', fontSize: '13px' }}>Delete</button>
      </div>
    </div>
  );
};

const BuilderCanvas = ({ fields = [], onDelete, onDuplicate, onEdit, activeFieldId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable'
  });

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={setNodeRef} className="card" style={{ width: '100%', maxWidth: '700px', minHeight: '400px', padding: '32px', border: isOver ? '2px dashed #2563eb' : '1px solid #e5e7eb' }}>
        <h2 style={{ margin: '0 0 24px 0', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
          Untitled Form
        </h2>
        
        {fields.length === 0 ? (
          <div style={{ 
            border: '2px dashed #e5e7eb', 
            borderRadius: '8px', 
            padding: '40px', 
            textAlign: 'center',
            color: '#888',
            background: '#fafafa'
          }}>
            Drag and drop fields from the sidebar to start building your form
          </div>
        ) : (
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {fields.map(field => (
                <CanvasFieldItem 
                  key={field.id} 
                  field={field} 
                  onDelete={onDelete} 
                  onDuplicate={onDuplicate} 
                  onEdit={onEdit} 
                  isActive={activeFieldId === field.id} 
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;
