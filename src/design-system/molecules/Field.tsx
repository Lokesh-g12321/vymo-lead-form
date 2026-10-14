import type { ReactNode } from 'react';
import styles from './Field.module.css';

type Props = {
  id: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

// Label on top, the control in the middle, then hint and error below it.
export function Field({ id, label, required, hint, error, children }: Props) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
