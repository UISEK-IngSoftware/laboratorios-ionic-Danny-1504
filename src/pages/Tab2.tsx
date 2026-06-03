import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='form-container'>
          <IonInput
          className='form-field'
          label='Nombre del Repositorio'
          labelPlacement='floating'
          fill='outline'
          placeholder='nombre-repositorio'>          
          </IonInput>
          <IonTextarea
          className='form-field'
          label='Descripcción del Repositorio'
          labelPlacement='floating'
          fill='outline'
          placeholder='Descripcción del repositorio'
          ></IonTextarea>
          <IonButton 
          className='form-field'
          expand='block'
          color='primary'
          >Crear Repositorio</IonButton>
        </div>       
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
