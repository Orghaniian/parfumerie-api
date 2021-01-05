# parfumerie-api
 
## Mise en route

### Setup
```
yarn install
```

### Démarrage en mode développement (Hot reload)
```
yarn dev
```

### Démarrage
```
yarn start
```

## Requêtes

### Article(s)

#### Obtenir la liste des articles

##### Requête HTTP
`GET http://localhost:4040/articles`


#### Obtenir les détails d'un article

##### Requête HTTP
`GET http://localhost:4040/article/:no_article`

#### Créer un article

##### Requête HTTP
`POST  http://localhost:4040/article`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| nom       |     String     |        Nom de l'article |
| prix_unitaire     |   Float    |      Prix unitaire de l'article |
| quantite_en_stock        |     Int      |   Quantite d'exemplaires de l'article en stock |
| disponible        |     Boolean      |   L'article est-il disponible ? |
| en_cadeau        |     Boolean      |   L'article est-il offert en cadeau ? |
| echangeable        |     Boolean      |   L'article est-il échangeable contre des points de fidélité ? |
:warning: :warning: :construction: :construction: :construction: :construction: :construction: :warning: :warning: :warning:
#### :wrench: Modifier un article :wrench:

##### Requête HTTP
`PUT http://localhost:4040/article/:no_article`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| nom       |     String     |        Nom de l'article |
| prix_unitaire     |   Float    |      Prix unitaire de l'article |
| quantite_en_stock        |     Int      |   Quantite d'exemplaires de l'article en stock |
| disponible        |     Boolean      |   L'article est-il disponible ? |
| en_cadeau        |     Boolean      |   L'article est-il offert en cadeau ? |
| echangeable        |     Boolean      |   L'article est-il échangeable contre des points de fidélité ? |
