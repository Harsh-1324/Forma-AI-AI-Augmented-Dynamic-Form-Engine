import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxField({ field, control, error, isAiFlagged }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2.5">
        <Controller
          name={field.key}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              id={field.key}
              checked={!!value}
              onCheckedChange={onChange}
              className={isAiFlagged ? "border-amber-400 ring-2 ring-amber-200" : ""}
            />
          )}
        />
        <Label htmlFor={field.key} style={{ marginBottom: 0 }}>
          {field.label}
        </Label>
      </div>
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}
