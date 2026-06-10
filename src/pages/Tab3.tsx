import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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
            <img src='https://avatars.githubusercontent.com/u/215515929?v=4' alt='Avatar'
            ></img>
            <IonHeader>
              <IonCardTitle color='primary'>Danny Fernando Caraguay Saltos</IonCardTitle>
              <IonCardSubtitle>Desarrollador</IonCardSubtitle>
              <IonCardContent>
              <p>Desarrollador de software con experiencia en Ionic y React. Apasionado por la creación de aplicaciones móviles y web. 
                En su tiempo libre, le gusta leer libros de programación y experimentar con nuevas tecnologías.  </p>
            </IonCardContent>

            </IonHeader>
          </IonCard>
          </div>        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
