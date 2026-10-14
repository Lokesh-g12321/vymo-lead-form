import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DynamicForm, type FormValues } from '../../design-system';
import { leadFormConfig } from './leadFormConfig';
import { validateLead } from './validation';
import styles from './LeadPage.module.css';

export function LeadPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const handleSubmit = (values: FormValues) => {
    console.log('Lead submitted', values);
    setSubmitted(values);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lead capture</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page-bg">
        <div className={styles.wrapper}>
          <section className={styles.card}>
            <h1 className={styles.heading}>New lead</h1>
            <p className={styles.subheading}>Fill in the details below and we’ll get in touch.</p>

            <DynamicForm config={leadFormConfig} validate={validateLead} onSubmit={handleSubmit} />
          </section>

          {submitted && (
            <section className={styles.result} aria-live="polite">
              <h2>Submitted values</h2>
              <pre>{JSON.stringify(submitted, null, 2)}</pre>
            </section>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
