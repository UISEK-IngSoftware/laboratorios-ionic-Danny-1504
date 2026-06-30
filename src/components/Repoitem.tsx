import './RepoItem.css';
import React from 'react';
import { pencilOutline, trash } from 'ionicons/icons';
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail
} from '@ionic/react';
import { Repository } from '../Interfaces/Repository';

interface RepoItemProps extends Repository {
  onEdit: (repo: Repository) => void;
  onDelete: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ onEdit, onDelete, ...repo }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail>
          <img src={repo.owner.avatar_url} alt={repo.name} />
        </IonThumbnail>

        <IonLabel>
          <h3>{repo.name}</h3>

          {repo.description && <p>{repo.description}</p>}

          {repo.language && (
            <p>
              <strong>Language:</strong> {repo.language}
            </p>
          )}
        </IonLabel>
      </IonItem>

      <IonItemOptions>

        <IonItemOption onClick={() => onEdit(repo)}>
          <IonIcon icon={pencilOutline} slot="icon-only" />
        </IonItemOption>

        <IonItemOption
          color="danger"
          onClick={() => onDelete(repo)}
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>

      </IonItemOptions>

    </IonItemSliding>
  );
};

export default RepoItem;