import React from 'react';

const PropertyPanel = ({ activeField, onUpdateField }) => {
  if (!activeField) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
        Select a field in the canvas to edit its properties
      </div>
    );
  }

  const handleChange = (key, value) => {
    onUpdateField({
      ...activeField,
      [key]: value
    });
  };

  const inputStyle = { width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', marginTop: '6px', fontSize: '13px' };
  const labelStyle = { display: 'block', fontWeight: '600', fontSize: '13px', color: '#374151' };
  const sectionStyle = { padding: '16px', borderBottom: '1px solid #e5e7eb' };
  const checkboxRowStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginBottom: '12px', userSelect: 'none' };

  return (
    <div>
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>Properties</h3>
        <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {activeField.type} Field
        </div>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          Label
          <input 
            type="text" 
            value={activeField.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            style={inputStyle}
            placeholder="Field Label"
          />
        </label>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          Placeholder
          <input 
            type="text" 
            value={activeField.placeholder || ''}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            style={inputStyle}
            placeholder="e.g. Enter your name"
          />
        </label>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          Help Text
          <input 
            type="text" 
            value={activeField.helpText || ''}
            onChange={(e) => handleChange('helpText', e.target.value)}
            style={inputStyle}
            placeholder="Helper description"
          />
        </label>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          Default Value
          <input 
            type="text" 
            value={activeField.defaultValue || ''}
            onChange={(e) => handleChange('defaultValue', e.target.value)}
            style={inputStyle}
            placeholder="Initial value"
          />
        </label>
      </div>

      <div style={sectionStyle}>
        <label style={checkboxRowStyle}>
          <input 
            type="checkbox" 
            checked={activeField.required || false}
            onChange={(e) => handleChange('required', e.target.checked)}
          />
          Required
        </label>

        <label style={checkboxRowStyle}>
          <input 
            type="checkbox" 
            checked={activeField.readOnly || false}
            onChange={(e) => handleChange('readOnly', e.target.checked)}
          />
          Read Only
        </label>

        <label style={{ ...checkboxRowStyle, marginBottom: 0 }}>
          <input 
            type="checkbox" 
            checked={activeField.hidden || false}
            onChange={(e) => handleChange('hidden', e.target.checked)}
          />
          Hidden
        </label>
      </div>
    </div>
  );
};

export default PropertyPanel;
