\* => domain du serveur

| Method     | Route                                   | Description                                                                  |
| ---------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| **POST**   | \*/auth/register                        | inscription                                                                  |
| **POST**   | \*/auth/login                           | connexion                                                                    |
| **POST**   | \*/auth/logout                          | déconnexion                                                                  |
| **GET**    | \*/auth/is_auth                         | l'utilisateur est-il authentifié ? (mise en place avec JWT si on a le temps) |
| **GET**    | \*/api/v1/users                         | récupérer tous les users (+ query pour des filtres)                          |
| **GET**    | \*/api/v1/users/:id                     | récupérer un user                                                            |
| **PATCH**  | \*/api/v1/users/:id                     | mettre à jour un user                                                        |
| **DELETE** | \*/api/v1/users/:id                     | supprimer un user                                                            |
| **GET**    | \*/api/v1/users/:id/groups              | récupérer tous les groups dont le user est membre                            |
| **POST**   | \*/api/v1/users/:id/groups              | créer un group                                                               |
| **GET**    | \*/api/v1/users/:id/holders             | récupérer tous les holders d'un user                                         |
| **GET**    | \*/api/v1/bristols                      | récupérer tous les bristols (+ query pour des filtres)                       |
| **POST**   | \*/api/v1/bristols                      | créer un bristol                                                             |
| **GET**    | \*/api/v1/bristols/:id                  | récupérer un bristol                                                         |
| **PATCH**  | \*/api/v1/bristols/:id                  | mettre à jour un bristol                                                     |
| **DELETE** | \*/api/v1/bristols/:id                  | supprimer un bristol                                                         |
| **GET**    | \*/api/v1/holders                       | récupérer tous les holders (+ query pour des filtres)                        |
| **POST**   | \*/api/v1/holders                       | créer un holder                                                              |
| **GET**    | \*/api/v1/holders/:id                   | récupérer un holder                                                          |
| **PATCH**  | \*/api/v1/holders/:id                   | mettre à jour un holder                                                      |
| **DELETE** | \*/api/v1/holders/:id                   | supprimer un holder                                                          |
| **GET**    | \*/api/v1/groups                        | récupérer tous les groups (+ query pour des filtres)                         |
| **GET**    | \*/api/v1/groups/:id                    | récupérer un group                                                           |
| **PATCH**  | \*/api/v1/groups/:id                    | mettre à jour un group                                                       |
| **DELETE** | \*/api/v1/groups/:id                    | supprimer un group                                                           |
| **GET**    | \*/api/v1/groups/:id/users              | récupérer tous les users d'un group                                          |
| **POST**   | \*/api/v1/groups/:id/users              | ajouter un user à un group                                                   |
| **DELETE** | \*/api/v1/groups/:groupId/users/:userId | supprimer un user d'un group                                                 |
| **GET**    | \*/api/v1/groups/:id/holders            | récupérer tous les holders d'un group                                        |
| **GET**    | \*/api/v1/rights                        | récupérer tous les droits                                                    |
| **POST**   | \*/api/v1/rights                        | créer un droit                                                               |
| **GET**    | \*/api/v1/rights/:id                    | récupérer un droit                                                           |
| **DELETE** | \*/api/v1/rights/:id                    | supprimer un droit                                                           |
