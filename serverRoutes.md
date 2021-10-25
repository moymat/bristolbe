\* => domain du serveur

| Method     | Route                                              | Description                                                                                     |
| ---------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **POST**   | \*/auth/register                                   | inscription                                                                                     |
| **POST**   | \*/auth/login                                      | connexion                                                                                       |
| **POST**   | \*/auth/logout                                     | déconnexion                                                                                     |
| **GET**    | \*/auth/isauth                                     | l'utilisateur est-il authentifié et renouvellement du JWT si besoin                             |
| **GET**    | \*/api/v1/users                                    | récupérer tous les users (+ query pour des filtres)                                             |
| **GET**    | \*/api/v1/users/:id                                | récupérer un user                                                                               |
| **PATCH**  | \*/api/v1/users/:id                                | mettre à jour un user                                                                           |
| **DELETE** | \*/api/v1/users/:id                                | supprimer un user                                                                               |
| **GET**    | \*/api/v1/users/:id/bristols                       | récupérer toutes l'arborésence des bristols auxquels le user a accès (+ query pour des filtres) |
| **GET**    | \*/api/v1/bristols                                 | récupérer toures l'arborésence des bristols (+ query pour des filtres)                          |
| **POST**   | \*/api/v1/bristols                                 | créer un bristol                                                                                |
| **GET**    | \*/api/v1/bristols/:id                             | récupérer un bristol et ses éventuels enfants                                                   |
| **PATCH**  | \*/api/v1/bristols/:id                             | mettre à jour un bristol et ses éventuels enfants                                               |
| **DELETE** | \*/api/v1/bristols/:id                             | supprimer un bristol et ses éventuels enfants                                                   |
| **GET**    | \*/api/v1/rights/bristols/:id                      | récupérer tous les droits liés à un bristol                                                     |
| **POST**   | \*/api/v1/rights/bristols/:bristolId/users/:userId | créer des droits d'un user sur un bristol                                                       |
| **PATCH**  | \*/api/v1/rights/bristols/:bristolId/users/:userId | modifier les droits d'un user sur un bristol                                                    |
| **DELETE** | \*/api/v1/rights/bristols/:bristolId/users/:userId | supprimer les droits d'un user sur un bristol                                                   |
