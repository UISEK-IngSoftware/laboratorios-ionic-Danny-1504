import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab3.css';
import React from 'react';
import { GithubUser } from '../Interfaces/GithubUser';
import { getUserInfo } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {
  
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadUserInfo = async () => {
    setLoading(true);
    const userData = await getUserInfo();
    setUserInfo(userData);
    setLoading(false);
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
          </IonCard>
          </div>  
          {loading &&<LoadingSpinner isOpen={loading}/> }                
      </IonContent>      
    </IonPage>
  );
};

export default Tab3;
