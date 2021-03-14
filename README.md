# graphql server
Mongoose + apollo server(graphql, subscription)
## running mongodb

```
npm run mongodb
```

## running

```
npm run dev
```

## build

```
npm run clean && npm run build
```

## doc
 - graphql-compose : https://graphql-compose.github.io/docs/basics/understanding-types.html
 - what is resolver : https://graphql-compose.github.io/docs/basics/what-is-resolver.html
 - mongoose-compose : https://github.com/graphql-compose/graphql-compose-mongoose
 - express & typescript-mongo : https://synaptiklabs.com/posts/express-typescript-mongo-part-3-mongoose/
 - apollo subscriptions : https://www.apollographql.com/docs/graphql-subscriptions/
 - graphql-tool : https://www.graphql-tools.com/


## gcloud configuration & project list
```
gcloud config list
gcloud projects list
```

## cloudrun deploy

> region : us-central1

```

export PROJECT_ID=$(gcloud config get-value project)
docker build -t gcr.io/${PROJECT_ID}/graphql-mongodb-server:latest .
docker push gcr.io/${PROJECT_ID}/graphql-mongodb-server:latest
gcloud run deploy graphql-mongodb-server --image gcr.io/${PROJECT_ID}/graphql-mongodb-server:latest --platform managed --region us-central1
```


## Jest

```
jest ./test/service.test.ts --forceExit
```