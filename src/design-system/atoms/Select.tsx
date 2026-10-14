import styles from './atoms.module.css';

export type Option = { label: string; value: string };

type Props = {
  id: string;
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function Select({ id, name, value, options, placeholder = 'Select', invalid, describedBy, onChange, onBlur }: Props) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      className={`${styles.control} ${invalid ? styles.invalid : ''}`}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
