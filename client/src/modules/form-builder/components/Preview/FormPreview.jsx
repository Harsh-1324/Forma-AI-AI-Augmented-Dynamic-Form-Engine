import React from 'react';
import FieldRenderer from './FieldRenderer';

const FormPreview = ({ fields }) => {
  if (!fields || fields.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
        No fields to preview. Add fields to the canvas first.
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '40px', background: '#fff' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Form Preview</h2>
      <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '14px' }}>This is how your form will look to users.</p>
      
      <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted in preview mode!'); }}>
        {fields.map(field => (
          <FieldRenderer key={field.id} field={field} />
        ))}
        
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <button type="submit" style={{ padding: '10px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
