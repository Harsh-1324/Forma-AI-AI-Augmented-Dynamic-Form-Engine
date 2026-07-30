import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DropdownField({ field, control, error, isAiFlagged }) {
  return (
    <div className="card">
      <Label htmlFor={field.key} className="mb-1.5 block">
        {field.label}
      </Label>
      <Controller
        name={field.key}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select value={value ?? ""} onValueChange={onChange}>
            <SelectTrigger
              id={field.key}
              className={
                "w-full " +
                (isAiFlagged ? "border-amber-400 ring-2 ring-amber-200" : "")
              }
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {(field.options || []).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}
