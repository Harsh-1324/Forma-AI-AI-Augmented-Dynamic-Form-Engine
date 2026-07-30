import React from 'react';

const FieldRenderer = ({ field }) => {
  const baseInputStyle = { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', marginTop: '6px', fontSize: '14px' };
  
  if (field.hidden) return null;

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'password':
      case 'number':
      case 'date':
      case 'location':
        return <input type={field.type === 'location' ? 'text' : field.type} placeholder={field.placeholder} defaultValue={field.defaultValue} style={baseInputStyle} readOnly={field.readOnly} required={field.required} />;
      case 'textarea':
      case 'rich_text':
        return <textarea placeholder={field.placeholder} defaultValue={field.defaultValue} style={{...baseInputStyle, minHeight: '100px'}} readOnly={field.readOnly} required={field.required} />;
      case 'dropdown':
      case 'multi_select':
        return (
          <select style={baseInputStyle} disabled={field.readOnly} required={field.required} defaultValue={field.defaultValue} multiple={field.type === 'multi_select'}>
            <option value="">{field.placeholder || 'Select an option'}</option>
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
            <option value="opt3">Option 3</option>
          </select>
        );
      case 'checkbox':
      case 'radio':
      case 'toggle':
        return (
          <div style={{ marginTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type={field.type === 'radio' ? 'radio' : 'checkbox'} disabled={field.readOnly} required={field.required} />
              {field.type === 'toggle' ? 'Enable' : 'Option 1'}
            </label>
          </div>
        );
      case 'slider':
      case 'rating':
        return <input type="range" min="1" max="5" style={{...baseInputStyle, padding: 0}} disabled={field.readOnly} />;
      case 'file_upload':
      case 'signature':
        return <input type="file" style={baseInputStyle} disabled={field.readOnly} required={field.required} />;
      case 'section':
      case 'divider':
        return <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />;
      default:
        return <div style={{ padding: '10px', background: '#fee2e2', color: '#ef4444', borderRadius: '4px' }}>Unsupported field type: {field.type}</div>;
    }
  };

  if (field.type === 'section' || field.type === 'divider') {
    return renderInput();
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', color: '#374151' }}>
        {field.label || 'Untitled Field'}
        {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      {field.helpText && <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{field.helpText}</div>}
      {renderInput()}
    </div>
  );
};

export default FieldRenderer;
