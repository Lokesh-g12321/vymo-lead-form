import type { ReactNode } from 'react';
import styles from './atoms.module.css';

type Props = {
  children: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ children, type = 'button', disabled, onClick }: Props) {
  return (
    <button type={type} className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
