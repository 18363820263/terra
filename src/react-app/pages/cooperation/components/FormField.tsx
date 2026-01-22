import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

export default function FormField<T extends FieldValues>({
  label,
  placeholder,
  type = "text",
  name,
  form,
  rules = {},
}: {
  label: string;
  placeholder: string;
  type?: string;
  name: Path<T>;
  form: UseFormReturn<T>;
  rules?: Record<string, any>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400 text-base font-light leading-6">
        {label}
      </label>
      <input
        type={type}
        {...form.register(name, rules)}
        className={`w-full h-12 p-3 rounded-md border bg-white text-gray-950 text-base font-light leading-6 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${form.formState.errors[name] ? 'border-red-500' : 'border-gray-200'}`}
        placeholder={placeholder}
      />
      {form.formState.errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {form.formState.errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
