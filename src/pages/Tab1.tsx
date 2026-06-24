import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/Repoitem';
import React from 'react';
import { Repository } from '../Interfaces/Repository';
import { fetchRepositories } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repos, setRepos] =React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const loadRepos = async () =>{
    setLoading(true);
    fetchRepositories().then((reposData)=>{
      setRepos(reposData);}).catch((error)=>{
        setErrorMsg("Error al cargar los repositorios. "+ error);     
    }).finally(()=>{
      setLoading(false);
    });
  }

  useIonViewDidEnter(()=>{
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map(repo =>(
            <RepoItem key={repo.id} {...repo} />
          ))}
        </IonList>
        {loading && <LoadingSpinner isOpen={loading} />}
        {errorMsg !== "" && (
          <IonText color="danger">
            {errorMsg}            
          </IonText>          
        )}       
      </IonContent>
    </IonPage>
  );
};

export default Tab1;