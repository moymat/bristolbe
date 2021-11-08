\* => domain du serveur

| Method     | Route                          | Description                                                                                     |
| ---------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| **POST**   | \*/auth/register               | inscription                                                                                     |
| **POST**   | \*/auth/login                  | connexion                                                                                       |
| **POST**   | \*/auth/logout                 | déconnexion                                                                                     |
| **GET**    | \*/auth/is-auth                | l'utilisateur est-il authentifié et renouvellement du JWT si besoin                             |
| **POST**   | \*/auth/reset-password         | Demande de renouvellement de mot de passe                                                       |
| **PATCH**  | \*/auth/reset-password         | Application du nouveau mot de passe                                                             |
| **GET**    | \*/auth/check-reset-code/:code | Vérification de la validité du code pour le renouvellement du mot de passe                      |
| **POST**   | \*/auth/verify                 | Vérification du code de validation d'adresse mail                                               |
| **GET**    | \*/auth/verify/resend          | Demande de renvoi du mail pour la validation de l'adresse mail                                  |
| **GET**    | \*/api/v1/users                | récupérer tous les users (+ query pour des filtres)                                             |
| **PATCH**  | \*/api/v1/users/:id/info       | Modifier les informations d'un user                                                             |
| **PATCH**  | \*/api/v1/users/:id/password   | Modifier le mote de passe d'un user                                                             |
| **PATCH**  | \*/api/v1/users/:id/email      | Modifier l'adresse email d'un user                                                              |
| **DELETE** | \*/api/v1/users/:id            | supprimer un user                                                                               |
| **GET**    | \*/api/v1/users/:id/bristols   | récupérer toutes l'arborésence des bristols auxquels le user a accès (+ query pour des filtres) |
| **POST**   | \*/api/v1/bristols             | créer un bristol                                                                                |
| **POST**   | \*/api/v1/bristols/move        | déplacer un bristol                                                                             |
| **GET**    | \*/api/v1/bristols/:id         | récupérer un bristol et ses éventuels enfants                                                   |
| **PATCH**  | \*/api/v1/bristols/:id         | mettre à jour un bristol et ses éventuels enfants                                               |
| **DELETE** | \*/api/v1/bristols/:id         | supprimer un bristol et ses éventuels enfants                                                   |
| **GET**    | \*/api/v1/bristols/:id/roles   | récupérer tous les droits liés à un bristol                                                     |
| **POST**   | \*/api/v1/bristols/:id/roles   | créer, modifier et/ou supprimer des droits sur un bristol                                       |
