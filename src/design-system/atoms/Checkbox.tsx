import styles from './atoms.module.css';

type Props = {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
};

export function Checkbox({ id, name, checked, label, invalid, describedBy, onChange, onBlur }: Props) {
  return (
    <label htmlFor={id} className={styles.checkboxRow}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        className={styles.checkbox}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
      />
      <span>{label}</span>
    </label>
  );
}
