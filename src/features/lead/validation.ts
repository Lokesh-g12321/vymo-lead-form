import { isVisible, type FieldConfig, type FormErrors, type FormValues, type Rule } from '../../design-system';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmpty(value: unknown): boolean {
  if (typeof value === 'boolean') return value === false;
  return String(value ?? '').trim() === '';
}

// Returns an error message when the rule fails, otherwise null.
function checkRule(rule: Rule, value: unknown): string | null {
  const text = String(value ?? '').trim();

  switch (rule.kind) {
    case 'required':
      return isEmpty(value) ? rule.message ?? 'This field is required' : null;
    case 'email':
      return text && !EMAIL_PATTERN.test(text) ? rule.message ?? 'Enter a valid email' : null;
    case 'digits':
      return text && !new RegExp(`^\\d{${rule.length}}$`).test(text)
        ? rule.message ?? `Enter ${rule.length} digits`
        : null;
    case 'maxLength':
      return text.length > rule.max ? rule.message ?? `Use at most ${rule.max} characters` : null;
  }
}

// Pure function: same config and values always give the same errors.
// Hidden fields are skipped, so company name is only required when it is shown.
export function validateLead(config: FieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (!isVisible(field, values)) continue;

    for (const rule of field.validations ?? []) {
      const message = checkRule(rule, values[field.name]);
      if (message) {
        errors[field.name] = message;
        break;
      }
    }
  }

  return errors;
}
