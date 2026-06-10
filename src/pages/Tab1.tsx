import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/Repoitem';
import React from 'react';
import { Repository } from '../Interfaces/Repository';
import { fetchRepositories } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repos, setRepos] =React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadRepos = async () =>{
    setLoading(true);
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false);
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
        {!loading && repos.length === 0 && (
          <div>
            <p>No se encontraron repositorios.</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;