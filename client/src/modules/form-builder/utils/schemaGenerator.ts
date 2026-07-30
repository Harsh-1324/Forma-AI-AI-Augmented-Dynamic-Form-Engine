export const generateSchema = (title, description, fields) => {
  return {
    title: title || "Untitled Form",
    description: description || "",
    fields: fields.map(field => {
      // Return a clean copy of the field configuration
      return {
        id: field.id,
        type: field.type,
        label: field.label || "",
        placeholder: field.placeholder || "",
        helpText: field.helpText || "",
        defaultValue: field.defaultValue || "",
        required: field.required || false,
        readOnly: field.readOnly || false,
        hidden: field.hidden || false
      };
    })
  };
};
