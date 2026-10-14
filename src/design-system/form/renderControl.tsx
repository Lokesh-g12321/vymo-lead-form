import { Checkbox, Select, TextInput } from '../atoms';
import type { FieldConfig, FormValue } from './types';

type ControlProps = {
  field: FieldConfig;
  id: string;
  value: FormValue;
  invalid: boolean;
  describedBy?: string;
  onChange: (value: FormValue) => void;
  onBlur: () => void;
};

// Maps a config type to the atom that draws it. New types only need a case here.
export function renderControl({ field, id, value, invalid, describedBy, onChange, onBlur }: ControlProps) {
  const common = { id, name: field.name, invalid, describedBy, onBlur };

  switch (field.type) {
    case 'text':
    case 'email':
      return (
        <TextInput
          {...common}
          type={field.type}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
    case 'textarea':
      return (
        <TextInput
          {...common}
          multiline
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <Select
          {...common}
          value={String(value ?? '')}
          options={field.options ?? []}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
    case 'checkbox':
      return <Checkbox {...common} checked={Boolean(value)} label={field.label} onChange={onChange} />;
  }
}
