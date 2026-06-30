import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/Repoitem';
import React from 'react';
import { Repository } from '../Interfaces/Repository';
import {
  fetchRepositories,
  deleteRepository
} from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {

  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const loadRepos = async () => {
    setLoading(true);

    fetchRepositories()
      .then((reposData) => {
        setRepos(reposData);
      })
      .catch((error) => {
        setErrorMsg("Error al cargar los repositorios. " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (repo: Repository) => {
    localStorage.setItem("repoToEdit", JSON.stringify(repo));
    window.location.href = "/edit-repository";
  };

  const handleDelete = async (repo: Repository) => {

    const confirmar = window.confirm(
      `¿Deseas eliminar el repositorio "${repo.name}"?`
    );

    if (!confirmar) return;

    try {

      await deleteRepository(repo.name);

      loadRepos();

    } catch (error) {

      setErrorMsg("Error al eliminar el repositorio. " + error);

    }

  };

  useIonViewDidEnter(() => {
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

          {repos.map(repo => (

            <RepoItem
              key={repo.id}
              {...repo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

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