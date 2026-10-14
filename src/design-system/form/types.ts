export type FieldType = 'text' | 'email' | 'select' | 'textarea' | 'checkbox';

export type Rule =
  | { kind: 'required'; message?: string }
  | { kind: 'email'; message?: string }
  | { kind: 'digits'; length: number; message?: string }
  | { kind: 'maxLength'; max: number; message?: string };

export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: { label: string; value: string }[];
  validations?: Rule[];
  // show this field only when another field has a given value
  showWhen?: { field: string; equals: string };
  // 'full' spans both columns on desktop
  width?: 'half' | 'full';
};

export type FormValue = string | boolean;
export type FormValues = Record<string, FormValue>;
export type FormErrors = Record<string, string>;
