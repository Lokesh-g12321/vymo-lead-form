import styles from './atoms.module.css';

type Props = {
  id: string;
  name: string;
  value: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function TextInput({ id, name, value, type = 'text', multiline, placeholder, invalid, describedBy, onChange, onBlur }: Props) {
  const className = [styles.control, multiline ? styles.textarea : '', invalid ? styles.invalid : ''].join(' ');

  if (multiline) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    );
  }

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className={className}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
