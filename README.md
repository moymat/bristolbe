# Bristol

_Bristol_ a été conçu avec deux camarades de promotion du 20/10/2021 au 19/11/2021 à l'occasion de la dernière étape de ma formation à l'école O'Clock.
Cette application à pour objectif de permettre aux utilisateurs de rédiger des fiches méthodologiques dans le but de partager les informations et connaissances.

### Stack
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
<br>
[![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)<br>
[![psql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

### Déployé sur
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://heroku.com/)

:globe_with_meridians: [Version en ligne](https://bristolbe.vercel.app/)

## Installation

### Prérequis

Il est nécessaire de posséder PostgreSQL et Sqitch pour pouvoir faire fonctionner le projet en local.

### Installation des dépendances

```bash
cd client
npm i
cd ../server
npm i
```

### Variables d'environnement

Le _client_ et le _server_ ont chacun besoin de leur propres variables d'environnement. Copiez/renommez les fichiers _.env.dev_ en _.env_ et configurez les pour correspondre à votre configuration.

### Création de la base de données

Depuis le dossier _server_

``` bash
cd scripts
bash init
```

## Démarrage de l'application

Le _server_

```bash
npm run dev
```

Le _client_

```bash
npm start
```
