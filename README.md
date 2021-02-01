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

## doc
 - graphql-compose : https://graphql-compose.github.io/docs/basics/understanding-types.html
 - what is resolver : https://graphql-compose.github.io/docs/basics/what-is-resolver.html
 - mongoose-compose : https://github.com/graphql-compose/graphql-compose-mongoose
 - express & typescript-mongo : https://synaptiklabs.com/posts/express-typescript-mongo-part-3-mongoose/
 - apollo subscriptions : https://www.apollographql.com/docs/graphql-subscriptions/
 - graphql-tool : https://www.graphql-tools.com/


 ## cloudrun

```
gcloud projects list
export PROJECT_ID=${}
docker build -t gcr.io/${PROJECT_ID}/graphql-mongodb-server:latest .
docker push gcr.io/${PROJECT_ID}/graphql-mongodb-server:latest
```


```
gcloud beta run deploy --image gcr.io/${PROJECT_ID}/graphql-mongodb-server:latest
```