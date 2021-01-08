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
yarn dev/npm run dev
```

### Démarrage
```
yarn start/npm run start
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


### Commande(s)

#### Obtenir la liste des Commandes

##### Requête HTTP
`GET http://localhost:4040/commandes`


#### Obtenir les détails d'une commande ( triées par date décroissante)

##### Requête HTTP
`GET http://localhost:4040/commande/:no_commande?limit=[limite]`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| limit     |   int    |      (Optionnel) nombre de commandes maximum  |

#### Créer une commande

##### Requête HTTP
`POST  http://localhost:4040/commande`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| prix       |     String     |         |
| frais_livraison     |   Float    |      Prix unitaire de l'article |
| code_client        |     Boolean      |   L'article est-il disponible ? |
| date_commande        |     Int      |   (Optionnel) Quantite d'exemplaires de l'article en stock |
| statut        |     Boolean      |   (Optionnel) L'article est-il offert en cadeau ? |

##### Réponse

L'objet réponse contient une propriété "no_commande" qui correspond au numéro de la commande ajoutée

<details>
    <summary>Exemple</summary>

```json
{
    "status": 200,
    "no_commande": 11,
    "message": "Nouvelle commande ajoutée avec succès"
}
```
</details>

#### Modifier une commande

##### Requête HTTP
`PUT http://localhost:4040/commande/:no_commande`

##### Paramètres
| Champ       |     Type     |        Description |
| :------------ | :-------------: | -------------: |
| prix       |     String     |         |
| frais_livraison     |   Float    |      Prix unitaire de l'article |
| code_client        |     Boolean      |   L'article est-il disponible ? |
| date_commande        |     Int      |   (Optionnel) Quantite d'exemplaires de l'article en stock |
| statut        |     Boolean      |   (Optionnel) L'article est-il offert en cadeau ? |

 :wrench:
:warning: :warning: :construction: :construction: :construction: :construction: :construction: :warning: :warning: :warning:


## A faire
-get/post/put tables
-commande
-get commandes liées à client
-get articles liés à client