# parfumerie-api
  - [Mise en route](#mise-en-route)
    * [Setup](#setup)
    * [Démarrage en mode développement (Hot reload)](#d-marrage-en-mode-d-veloppement--hot-reload-)
    * [Démarrage](#d-marrage)
  - [Requêtes](#requ-tes)
    * [Exemple de requête](#exemple-de-requ-te)
    * [Article(s)](#article-s-)
      + [Obtenir la liste des articles](#obtenir-la-liste-des-articles)
      + [Obtenir les détails d'un article](#obtenir-les-d-tails-d-un-article)
      + [Créer un article](#cr-er-un-article)
      + [Modifier un article](#modifier-un-article)
 
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

### Exemple de requête
```javascript
    fetch("http://localhost:4040/articles").then((response) => {
        response.json().then((data) => (articles = data.data));
    });
```

### Article(s)

#### Obtenir la liste des articles

##### Requête HTTP
`GET http://localhost:4040/articles`


#### Obtenir les détails d'un article

##### Requête HTTP
`GET http://localhost:4040/article/:no_article?limit=[limite]`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| nom       |     String     |        Nom de l'article |
| limit     |   int    |      (Optionnel) nombre d'articles maximum  |

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

##### Réponse

L'objet réponse contient une propriété "no_article" qui correspond au numéro de l'article ajouté

<details>
    <summary>Exemple</summary>

```json
{
    "status": 200,
    "no_article": 11,
    "message": "Nouvel article ajouté avec succès"
}
```
</details>

#### Modifier un article

##### Requête HTTP
`PUT http://localhost:4040/article/:no_article`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| nom       |     String     |        (Optionnel) Nouveau nom de l'article |
| prix_unitaire     |   Float    |      (Optionnel) Nouveau prix unitaire de l'article |
| quantite_en_stock        |     Int      |   (Optionnel) Nouvelle quantite d'exemplaires de l'article en stock |
| disponible        |     Boolean      |   (Optionnel) L'article est-il disponible ? |
| en_cadeau        |     Boolean      |   (Optionnel) L'article est-il offert en cadeau ? |
| echangeable        |     Boolean      |   (Optionnel) L'article est-il échangeable contre des points de fidélité ? |

 :wrench:
:warning: :warning: :construction: :construction: :construction: :construction: :construction: :warning: :warning: :warning: