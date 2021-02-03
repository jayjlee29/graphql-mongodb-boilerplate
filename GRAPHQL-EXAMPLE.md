
 # graphql example
 ## create channel
 ```
mutation {
  Channel {
    createOne(record:{
      title: "테스트채널 01",
      description: "재미있는 채널"
    }) {
      recordId
      record {
        id
        title
        description
        userId
      }
    }
  }
}
 ```


 ## subscription channel
 ```
subscription {
  channel(channelId: "6017e3b4b6083be511a14b17"){
    channel {
      id
      title
      description
    }
    message{
      payload
      channelId
      createdAt
      userId
      targetIds
    }
    created
  }
}
 ```


 ### publish message to channel
 ```
mutation {
    publishChannelMessage(channelId: "6017e3b4b6083be511a14b17", 
      payload: "테스트 메세지 입니다.!!!") {
    channelId
    payload	
		createdAt
  }
}
 ```