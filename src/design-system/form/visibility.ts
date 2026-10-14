import type { FieldConfig, FormValues } from './types';

export function isVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.showWhen) return true;
  return values[field.showWhen.field] === field.showWhen.equals;
}

export function visibleFields(config: FieldConfig[], values: FormValues): FieldConfig[] {
  return config.filter((field) => isVisible(field, values));
}
