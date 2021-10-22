\* => domain du serveur

| Method     | Route                                                           | Description                                                                  |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **POST**   | \*/auth/register                                                | inscription                                                                  |
| **POST**   | \*/auth/login                                                   | connexion                                                                    |
| **POST**   | \*/auth/logout                                                  | déconnexion                                                                  |
| **GET**    | \*/auth/is_auth                                                 | l'utilisateur est-il authentifié ? (mise en place avec JWT si on a le temps) |
| **GET**    | \*/api/v1/users                                                 | récupérer tous les users                                                     |
| **GET**    | \*/api/v1/users/:id                                             | récupérer un user                                                            |
| **PATCH**  | \*/api/v1/users/:id                                             | mettre à jour un user                                                        |
| **DELETE** | \*/api/v1/users/:id                                             | supprimer un user                                                            |
| **DELETE** | \*/api/v1/users/:userId/organizations                           | récupérer toutes les orgas dont le user est membre                           |
| **DELETE** | \*/api/v1/users/:userId/organizations/:orgaId/groups            | récupérer tous les groups d'une orga dont le user est membre                 |
| **GET**    | \*/api/v1/organizations                                         | récupérer toutes les orga                                                    |
| **POST**   | \*/api/v1/organizations                                         | créer une orga                                                               |
| **GET**    | \*/api/v1/organizations/:id                                     | récupérer l'orga                                                             |
| **PATCH**  | \*/api/v1/organizations/:id                                     | mettre à jour une orga                                                       |
| **DELETE** | \*/api/v1/organizations/:id                                     | supprimer une orga                                                           |
| **GET**    | \*/api/v1/organizations/:id/users                               | récupérer tous les users d'une orga                                          |
| **POST**   | \*/api/v1/organizations/:id/users                               | ajouter un user à une orga                                                   |
| **DELETE** | \*/api/v1/organizations/:orgaId/users/:userId                   | supprimer une utilisateur d'une orga                                         |
| **GET**    | \*/api/v1/organizations/:id/holders                             | récupérer tous les holders d'une orga                                        |
| **POST**   | \*/api/v1/organizations/:id/holders                             | ajouter un holder à une orga                                                 |
| **GET**    | \*/api/v1/organizations/:orgaId/holders/:holderId               | récupérer un holder d'une orga                                               |
| **PATCH**  | \*/api/v1/organizations/:orgaId/holders/:holderId               | mettre à jour un holder d'une orga                                           |
| **DELETE** | \*/api/v1/organizations/:orgaId/holders/:holderId               | supprimer un holder d'une orga                                               |
| **GET**    | \*/api/v1/organizations/:orgaId/holders/:holderId/users         | récupérer tous les users d'un holder                                         |
| **POST**   | \*/api/v1/organizations/:orgaId/holders/:holderId/users/:userId | ajouter un user à un holder                                                  |
| **DELETE** | \*/api/v1/organizations/:orgaId/holders/:holderId/users/:userId | supprimer un user d'un holder                                                |
