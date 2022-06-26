# Uml

## Structure

Monorepo + microservices backend & frontend

### Monorepo

Nous utilisons `pnpm` pour gérer le monorepo.
Les paquets utilitaires sont contenus dans `packages` et préfixer avec `uml-`
Les services sont contenus dans `src` et ne sont pas préfixés.

### Services

Les services ont pour but d'être développé indépendamment les uns des autres. Toutefois certaines parties sont communes.

Structure attendue d'un service:

```
serviceFolder
|_ api
|_ front
|_ shared
```

Commandes attendues:

- `npm run dev`: lance le service en livereload
- `npm run build`: créé un paquet dans le dossier `dist`. Ce paquet est exécutable avec la commande `npm run start` (pour une api) ou pouvant être servit par un serveur http (dans le cas d'un front)
- `npm run start`:
  - initialise & maintient les bases de données nécessaires au service à jour
  - exécute le paquet contenu dans `dist`, pour la production.

### Gateway

`Gateway` est un service particulier qui joue le rôle de reverse proxy entre l'extérieur et les services exposés. Cf readme de l'api gateway

### Portal

`Portal` aggrége les différents services front en une application javascript unique. `Portal` attend des services front qu'ils exposent un paquet nommé `main.js` à la racine du service.
Ce paquet doit exposer les fonctions suivantes:

- mount

Cf readme du portail

### Dépendances communes & hoisting

Certaines dépendances telles que class-validator sont partagées par beaucoup de service. Elles sont mises dans le node_module commun (`hoisting`) afin d'éviter plusieurs versions pouvant entrer en

## Pour déployer

1/ Avoir un kubeconfig et au besoin un fichier .pem. Enregistre les valeurs en base 64 dans gitlab & mettre à jour le script de CI. Pour encoder les fichiers en base64: `cat kubeconfig | base64`.

Ces valeurs sont ensuite décodées dans le gitlab.ci, par exemple avec: `echo $KUBE_CONFIG | base64 -di > .kube/config`

4/ Ne reste plus qu'à obtenir une ip externe, ce qui se fait selon le fournisseur

- ovh: déployer le load balancer avec `kubectl apply -f deploy/external-ip/load-balancer.yaml`. Le site est disponible à l'ip attribuée au load balancer. Le service devra redirigé sur l'api gateway (à configurer)

- ibm-cloud: déployer un service nodePort avec `kubectl apply -f deploy/external-ip/node-port.yaml`. Le site est disponible à l'ip attribuée au noeud (node) + le nodePort utilisé dans le fichier. Le service redirige sur l'api gateway (déjà configuré)

4/ Déployer postgresql
Modifier les variables <POSTGRES_USER> & <POSTGRES_PASSWORD> dans `deploy/postgres/postgresql.yaml`.
Déployer le service postgresql & les services associés: `kubectl apply -f deploy/postgres/postgresql.yaml`

### Débugger container K8S en crashLoopBackOff

kubectl run YOUR_POD_NAME --image SOME_PUBLIC_IMAGE:latest --command tailf /dev/null

ou

kubectl run YOUR_POD_NAME --image SOME_PUBLIC_IMAGE:latest --command /usr/bin/tail -- -f /dev/null sur alpine

## Sauvegarde de la BDD en local

- se connecter sur le pod postgres
- lancer un dump des différentes bdd:

```
pg_dump -U Postgres account > account.sql
pg_dump -U Postgres diagram > diagram.sql
```

- Copier le fichier du pod postgres vers un répertoire local.

```
kubectl cp postgres-pod:/account.sql /dev/uml/save/account.sql
kubectl cp postgres-pod:/diagram.sql /dev/uml/save/diagram.sql
```

## Réinit de la BDD sur le pod

- copier les fichiers du répertoire local vers le pod postgres

```
 kubectl cp /dev/uml/save/account.sql postgres-pod:/account.sql
 kubectl cp /dev/uml/save/diagram.sql postgres-pod:/diagram.sql
```

### TODO

- crypter mdps
- postgres doit avoir mot de passe
- docker copy: doit suivre les symlinks. Si fonctionne, tenter en hoistant tout les node_modules
- css: scoper css de chaque module et le servir
- createDatabase pourrait être un cli commun
