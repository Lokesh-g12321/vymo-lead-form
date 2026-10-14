import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '../atoms';
import { Field } from '../molecules/Field';
import { renderControl } from './renderControl';
import { visibleFields } from './visibility';
import type { FieldConfig, FormErrors, FormValue, FormValues } from './types';
import styles from './Form.module.css';

type Props = {
  config: FieldConfig[];
  validate: (config: FieldConfig[], values: FormValues) => FormErrors;
  onSubmit: (values: FormValues) => void;
  submitLabel?: string;
};

function emptyValues(config: FieldConfig[]): FormValues {
  const values: FormValues = {};
  config.forEach((field) => {
    values[field.name] = field.type === 'checkbox' ? false : '';
  });
  return values;
}

export function DynamicForm({ config, validate, onSubmit, submitLabel = 'Submit' }: Props) {
  const [values, setValues] = useState<FormValues>(() => emptyValues(config));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [triedSubmit, setTriedSubmit] = useState(false);

  const fields = visibleFields(config, values);
  const errors = useMemo(() => validate(config, values), [config, values, validate]);

  const setValue = (name: string, value: FormValue) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const markTouched = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);

    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => (allTouched[field.name] = true));
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) return;

    // only send what the user can actually see
    const result: FormValues = {};
    fields.forEach((field) => (result[field.name] = values[field.name]));
    onSubmit(result);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const id = `field-${field.name}`;
        // after a submit attempt, every visible field shows its error
        const error = touched[field.name] || triedSubmit ? errors[field.name] : undefined;
        const describedBy = error ? `${id}-error` : field.hint ? `${id}-hint` : undefined;
        const required = field.validations?.some((rule) => rule.kind === 'required');

        return (
          <div key={field.name} className={`${styles.cell} ${field.width === 'full' ? styles.full : ''}`}>
            <Field
              id={id}
              label={field.type === 'checkbox' ? undefined : field.label}
              required={required}
              hint={field.hint}
              error={error}
            >
              {renderControl({
                field,
                id,
                value: values[field.name],
                invalid: Boolean(error),
                describedBy,
                onChange: (value) => setValue(field.name, value),
                onBlur: () => markTouched(field.name),
              })}
            </Field>
          </div>
        );
      })}

      <div className={styles.actions}>
        <Button type="submit">{submitLabel}</Button>
      </div>

      {triedSubmit && errorCount > 0 && (
        <p className={`${styles.summary} ${styles.full}`} role="status">
          Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} before submitting.
        </p>
      )}
    </form>
  );
}
