import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TextField({ field, register, error, isAiFlagged }) {
  return (
    <div className="card">
      <Label htmlFor={field.key} className="mb-1.5 block">
        {field.label}
      </Label>
      <Input
        id={field.key}
        type={field.type === "number" ? "number" : "text"}
        className={isAiFlagged ? "border-amber-400 ring-2 ring-amber-200" : ""}
        {...register(field.key)}
      />
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}
