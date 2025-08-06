# Application de Recrutement

## Description
Ce projet est une application logicielle de recrutement développée avec React JS, Material UI et Firebase. Elle permet aux candidats de postuler à des postes, tout en offrant aux administrateurs des outils pour gérer les candidatures et évaluer les candidats.

## Fonctionnalités
- **Formulaire de candidature** : Un formulaire complet avec validation en temps réel des critères d'éligibilité.
- **Vérificateur d'éligibilité** : Vérifie instantanément si les candidats remplissent les critères requis.
- **Tableau de bord candidat** : Les candidats peuvent consulter le statut de leur candidature et recevoir des notifications.
- **Tableau de bord administrateur** : Les administrateurs peuvent gérer les candidats, voir des statistiques et filtrer les candidatures.
- **Téléversement de documents** : Les candidats peuvent téléverser les documents nécessaires tels que diplômes et CV.
- **Notifications en temps réel** : Les candidats et les administrateurs reçoivent des notifications concernant le statut des candidatures.

## Structure du projet
```
recruitment-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── CandidateForm.jsx
│   │   ├── CandidateList.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EligibilityChecker.jsx
│   │   └── Navbar.jsx
│   ├── pages
│   │   ├── AdminPage.jsx
│   │   ├── CandidatePage.jsx
│   │   └── HomePage.jsx
│   ├── services
│   │   ├── auth.js
│   │   ├── candidates.js
│   │   └── settings.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Instructions d'installation
1. Clonez le dépôt :
   ```
   git clone <url-du-dépôt>
   ```
2. Accédez au dossier du projet :
   ```
   cd recruitment-app
   ```
3. Installez les dépendances :
   ```
   npm install
   ```
4. Démarrez le serveur de développement :
   ```
   npm start
   ```

## Utilisation
- Rendez-vous sur la page d'accueil pour en savoir plus sur l'application.
- Les candidats peuvent remplir le formulaire de candidature et vérifier leur éligibilité.
- Les administrateurs peuvent gérer les candidats et consulter les statistiques des candidatures.

## Licence
Ce projet est sous licence
"# Sod_Rec" 
