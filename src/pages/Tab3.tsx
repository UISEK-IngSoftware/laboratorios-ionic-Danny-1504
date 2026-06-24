import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonSpinner, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab3.css';
import React from 'react';
import { GithubUser } from '../Interfaces/GithubUser';
import { getUserInfo } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router';
import AuthService from '../services/AuthService';
import { logOutOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const history = useHistory();

  const loadUserInfo = async () => {
    setLoading(true);
    getUserInfo().then((user) => setUserInfo(user))
    .catch((error) => setErrorMsg("Error al leer la información del usuario. " + error))
    .finally(() => setLoading(false));
  }

  const handleLogout = () => {
    AuthService.logout();
    history.replace('/login');
  }

  useIonViewWillEnter(() => {
    loadUserInfo();
  });
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='card-container'>
          {userInfo && (            
          <IonCard
          className='card'>
            <img src={userInfo?.avatar_url} alt={userInfo?.login}
            ></img>
            <IonHeader>
              <IonCardTitle color='primary'>Danny Fernando Caraguay Saltos</IonCardTitle>
              <IonCardSubtitle>Desarrollador</IonCardSubtitle>
              <IonCardContent>
              {userInfo?.bio}
            </IonCardContent>
            </IonHeader>
          </IonCard>)}
          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton
          expand='block'
          color='danger'
          onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline}/>
            Cerrar Sesión
          </IonButton>
        </div>  
          {loading &&<LoadingSpinner isOpen={loading}/> }                
      </IonContent>      
    </IonPage>
  );
};

export default Tab3;
