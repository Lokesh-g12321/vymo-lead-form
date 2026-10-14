import { IonApp, setupIonicReact } from '@ionic/react';
import { LeadPage } from './features/lead/LeadPage';

setupIonicReact({ mode: 'md' });

export default function App() {
  return (
    <IonApp>
      <LeadPage />
    </IonApp>
  );
}
