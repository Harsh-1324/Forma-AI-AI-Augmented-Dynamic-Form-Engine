import TextField from "./fields/TextField.jsx";
import DropdownField from "./fields/DropdownField.jsx";
import CheckboxField from "./fields/CheckboxField.jsx";
import DateField from "./fields/DateField.jsx";

// Maps a field's `type` (from the MongoDB schema) to the React component
// that renders it. "radio" and "textarea" reuse Dropdown/Text visually
// but could be split into dedicated components as the design evolves.
const FIELD_COMPONENTS = {
  text: TextField,
  number: TextField,
  textarea: TextField,
  date: DateField,
  dropdown: DropdownField,
  radio: DropdownField,
  checkbox: CheckboxField,
};

export default function FieldFactory({ field, register, error, isAiFlagged }) {
  const Component = FIELD_COMPONENTS[field.type] || TextField;
  return <Component field={field} register={register} error={error} isAiFlagged={isAiFlagged} />;
}
