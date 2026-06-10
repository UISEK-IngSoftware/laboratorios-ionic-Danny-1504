import './RepoItem.css';
import React from 'react';
import {pencilOutline, trash} from 'ionicons/icons';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { Repository } from '../Interfaces/Repository';



const RepoItem: React.FC<Repository> = (repo) => {
    return (
                  <IonItemSliding>
                    <IonItem>
                      <IonThumbnail>
                        <img src={repo.owner.avatar_url} alt={repo.name} />
                      </IonThumbnail>
                      <IonLabel>
                        <h3>{repo.name}</h3>
                        {repo.description &&<p>{repo.description}</p>}
                        {repo.language&&(
                          <p><strong>Language:</strong>{repo.language}</p>
                        )}
                      </IonLabel>
                    </IonItem>
                    <IonItemOptions>
                      <IonItemOption>
                        <IonIcon icon={pencilOutline} slot="icon-only" />
                      </IonItemOption>
                      <IonItemOption color="danger">
                        <IonIcon icon={trash} slot="icon-only" />
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                  
    );
};

export default RepoItem;