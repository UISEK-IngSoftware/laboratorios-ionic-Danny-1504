import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonSpinner, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { RepositoryPayload } from '../Interfaces/RepositoryPayload';
import { useHistory } from 'react-router';
import { createRepository } from '../services/GithubServices';
import { setPlatformHelpers } from 'ionicons/dist/types/stencil-public-runtime';
import React from 'react';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const repoFormData : RepositoryPayload = {
    name: '',
    description: '',    
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;    
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepository = () => {
    if (repoFormData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio');
      return;
    }
    setLoading(true);
    createRepository(repoFormData)
    .then(() => {
      history.push('/tab1');
    }).catch(error => {
      setErrorMsg('Error al crear el repositorio'+ error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useIonViewWillEnter(() => {
    setErrorMsg("");
  });

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
          placeholder='nombre-repositorio'
          value={repoFormData.name}
          onIonChange={e => setRepoName(e.detail.value!)}
          ></IonInput>
          <IonTextarea
          className='form-field'
          label='Descripcción del Repositorio'
          labelPlacement='floating'
          fill='outline'
          placeholder='Descripcción del repositorio'
          value={repoFormData.description}
          onIonChange={e => setRepoDescription(e.detail.value!)}
          ></IonTextarea>
          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton 
          className='form-field'
          expand='block'
          fill='solid'
          onClick={saveRepository}          
          >Crear Repositorio</IonButton>
        </div>
        {loading &&<IonSpinner name="circular" />}       
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
