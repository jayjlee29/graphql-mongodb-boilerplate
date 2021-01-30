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


 ## graphql example
 ### create channel
 ```
 mutation {
  Channel {
    createOne(record:{
      title: "testchannel",
      description: "재미있는 채널"
    }) {
      recordId
      record {
        channelId
        title
        description
      }
    }
  }
}
 ```


 ### subscription channel
 ```
 subscription {
  channel(channelId: "{channelId}"){
    channelId
    payload,
    created
  }
}
 ```


 ### publish message to channel
 ```
 mutation {
    publishChannelMessage(channelId: {channelId}, payload: "메세지 입니다.!!!") {
    channelId
    payload
  }
}
 ```