import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const fieldCategories = [
  {
    title: 'Basic Fields',
    fields: [
      { type: 'text', label: 'Text', icon: 'T' },
      { type: 'textarea', label: 'Textarea', icon: '¶' },
      { type: 'email', label: 'Email', icon: '@' },
      { type: 'phone', label: 'Phone', icon: '☎' },
      { type: 'password', label: 'Password', icon: '***' },
      { type: 'number', label: 'Number', icon: '123' },
      { type: 'date', label: 'Date', icon: '📅' },
      { type: 'dropdown', label: 'Dropdown', icon: '▼' },
      { type: 'radio', label: 'Radio', icon: '◉' },
      { type: 'checkbox', label: 'Checkbox', icon: '☑' },
    ]
  },
  {
    title: 'Advanced Fields',
    fields: [
      { type: 'toggle', label: 'Toggle', icon: 'Toggle' },
      { type: 'slider', label: 'Slider', icon: '—○—' },
      { type: 'rating', label: 'Rating', icon: '★' },
      { type: 'file_upload', label: 'File Upload', icon: '📁' },
      { type: 'signature', label: 'Signature', icon: '✍' },
      { type: 'location', label: 'Location', icon: '📍' },
      { type: 'rich_text', label: 'Rich Text', icon: 'RT' },
      { type: 'multi_select', label: 'Multi Select', icon: '☑☑' },
    ]
  },
  {
    title: 'Layout',
    fields: [
      { type: 'section', label: 'Section', icon: '⚏' },
      { type: 'divider', label: 'Divider', icon: '—' },
    ]
  }
];

const FieldCard = ({ field, onAdd }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${field.type}`,
    data: { field }
  });

  const handleClick = () => {
    onAdd({ type: field.type, label: field.label });
  };

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  } : undefined;

  return (
    <div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="card" 
      onClick={handleClick}
      style={{ 
        padding: '10px 12px', 
        cursor: 'grab', 
        marginBottom: '0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        userSelect: 'none',
        transition: transform ? 'none' : 'background 0.2s',
        ...style
      }}
      onMouseEnter={(e) => { if(!transform) e.currentTarget.style.background = '#f9fafb' }}
      onMouseLeave={(e) => { if(!transform) e.currentTarget.style.background = '#fff' }}
    >
      <div style={{ 
        width: '24px', 
        height: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f3f4f6', 
        borderRadius: '4px',
        fontSize: '12px',
        color: '#4b5563',
        fontWeight: 'bold'
      }}>
        {field.icon}
      </div>
      <strong style={{ fontSize: '13px', fontWeight: '500' }}>{field.label}</strong>
    </div>
  );
};

const BuilderSidebar = ({ onAddField }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Field Library</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {fieldCategories.map((category, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
              {category.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {category.fields.map((field) => (
                <FieldCard key={field.type} field={field} onAdd={onAddField} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderSidebar;
