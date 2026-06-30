import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonInput
} from '@ionic/react';
import './Tab2.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../Interfaces/RepositoryPayload';
import { updateRepository } from '../services/GithubServices';

const EditRepository: React.FC = () => {

  const history = useHistory();

  const repo = JSON.parse(localStorage.getItem("repoToEdit") || "{}");

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [repoFormData, setRepoFormData] = React.useState<RepositoryPayload>({
    name: repo.name || "",
    description: repo.description || ""
  });

  const updateRepo = () => {

    if (repoFormData.name.trim() === "") {
      setErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }

    console.log("repoFormData:", repoFormData);

    setLoading(true);

    updateRepository(repo.name, repoFormData)
      .then(() => {
        localStorage.removeItem("repoToEdit");
        history.push("/tab1");
      })
      .catch(error => {
        setErrorMsg("Error al actualizar el repositorio. " + error);
      })
      .finally(() => {
        setLoading(false);
      });

  };

  const cancelar = () => {
    localStorage.removeItem("repoToEdit");
    history.push("/tab1");
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <div className="form-container">

          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            labelPlacement="floating"
            fill="outline"
            value={repoFormData.name}
            onIonInput={(e: any) => {
              setRepoFormData(prev => ({
                ...prev,
                name: e.target.value
              }));
            }}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            fill="outline"
            value={repoFormData.description}
            onIonInput={(e: any) => {
              setRepoFormData(prev => ({
                ...prev,
                description: e.target.value
              }));
            }}
          />

          {errorMsg !== "" && (
            <IonText color="danger">
              {errorMsg}
            </IonText>
          )}

          <IonButton
            expand="block"
            onClick={updateRepo}
          >
            Actualizar Repositorio
          </IonButton>

          <IonButton
            expand="block"
            color="medium"
            onClick={cancelar}
          >
            Cancelar
          </IonButton>

        </div>

        {loading && <IonSpinner name="circular" />}

      </IonContent>

    </IonPage>
  );
};

export default EditRepository;